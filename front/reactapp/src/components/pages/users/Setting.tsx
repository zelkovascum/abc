import { FC, memo, MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import Cookies from "js-cookie";
import { AuthContext } from "providers/AuthProvider";
import { signOut } from "utils/api/auth";

export const Setting: FC = memo(() => {
	const { loading, isSignIn, setIsSignIn, currentUser } =
		useContext(AuthContext);
	const navigate = useNavigate();

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

	const AuthButtons = () => {
		if (!loading) {
			if (isSignIn) {
				return (
					<Button color="inherit" onClick={handleSignOut}>
						ログアウト
					</Button>
				);
			} else {
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
		} else {
			return <></>;
		}
	};

	return (
		<>
			{isSignIn && currentUser ? (
				<>
					<Avatar alt={currentUser?.name} src="" />
					<p>Email: {currentUser?.email}</p>
					<p>Name: {currentUser?.name}</p>
					<p>id: {currentUser?.id}</p>
					<AuthButtons />
				</>
			) : (
				<>{/* <p>Not signed in</p> */}</>
			)}
		</>
	);
});
