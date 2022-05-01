import { FC, memo, MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Box } from "@mui/material";
import Cookies from "js-cookie";
import { AuthContext } from "providers/AuthProvider";
import { signOut } from "utils/api/auth";
import { ImageUploadModal } from "components/molucules/ImageUploadModal";
import { UpdatePrefecturesModal } from "components/molucules/UpdatePrefecturesModal";

export const Setting: FC = memo(() => {
	const { loading, isSignIn, setIsSignIn, currentUser } =
		useContext(AuthContext);
	const navigate = useNavigate();

	const [isOpenImageUploadModal, setIsOpenImageUploadModal] = useState(false);
	const [isOpenSelectPrefecturesModal, setIsOpenSelectPrefecturesModal] =
		useState(false);

	const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			const res = await signOut();
			if (res.data.success === true) {
				// サインアウト時に各Cookieを削除
				Cookies.remove("_access_token");
				Cookies.remove("_client");
				Cookies.remove("_uid");
				setIsSignIn(false);
				navigate("/signin");
				console.log("Succeeded in sign out");
			} else {
				console.log("Failed in sign out");
			}
		} catch (e) {
			console.error(e);
		}
	};

	function AuthButtons() {
		if (!loading) {
			if (isSignIn) {
				return (
					<Button color="warning" onClick={handleSignOut}>
						ログアウト
					</Button>
				);
			}
			return (
				<>
					{/* <Button component={Link} to="/signin" color="inherit">
							ログイン
						</Button>
						<Button component={Link} to="/signup" color="inherit">
							新規登録
						</Button> */}
				</>
			);
		}
		return <></>;
	}

	return (
		<>
			{isSignIn && currentUser ? (
				<Box sx={{ p: 1 }}>
					<Avatar
						alt={currentUser?.name}
						src={`${currentUser.image?.url}`}
						sx={{ width: 50, height: 50 }}
					/>
					<Button onClick={() => setIsOpenImageUploadModal(true)}>
						プロフィール画像を変更
					</Button>
					<Button onClick={() => setIsOpenSelectPrefecturesModal(true)}>
						住所を変更
					</Button>
					<p>ユーザーネーム: {currentUser?.name}</p>
					<p>住所: {currentUser?.address}</p>
					<AuthButtons />
				</Box>
			) : (
				<>{/* <p>Not signed in</p> */}</>
			)}
			<ImageUploadModal
				isOpenModal={isOpenImageUploadModal}
				setIsOpenModal={setIsOpenImageUploadModal}
				userId={currentUser?.id!}
			/>
			<UpdatePrefecturesModal
				isOpenModal={isOpenSelectPrefecturesModal}
				setIsOpenModal={setIsOpenSelectPrefecturesModal}
				userId={currentUser?.id!}
			/>
		</>
	);
});
