import { FC, memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Box } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { ImageUploadModal } from "components/molucules/users/ImageUploadModal";
import { CurrentLocationUpdateModal } from "components/molucules/users/CurrentLocationUpdateModal";
import { SignOutModal } from "components/molucules/users/SignOutModal";

export const Setting: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [isOpenImageUploadModal, setIsOpenImageUploadModal] = useState(false);
	const [
		isOpenCurrentLocationUpdateModal,
		setIsOpenCurrentLocationUpdateModal,
	] = useState(false);
	const [isOpenSignOutModal, setIsOpenSignOutModal] = useState(false);

	return (
		<>
			<Box sx={{ p: 1 }}>
				<Avatar
					alt={currentUser?.name}
					src={`${currentUser!.image?.url}`}
					sx={{ width: 50, height: 50 }}
				/>
				<Button onClick={() => setIsOpenImageUploadModal(true)}>
					プロフィール画像を変更
				</Button>
				<Button onClick={() => setIsOpenCurrentLocationUpdateModal(true)}>
					住所を変更
				</Button>
				<p>ユーザーネーム: {currentUser?.name}</p>
				<p>住所: {currentUser?.address}</p>
				<Button>
					<Link to="/users/reactions">reactions</Link>
				</Button>
				<Button onClick={() => setIsOpenSignOutModal(true)}>ログアウト</Button>
			</Box>
			<SignOutModal
				isOpenModal={isOpenSignOutModal}
				setIsOpenModal={setIsOpenSignOutModal}
			/>
			<ImageUploadModal
				isOpenModal={isOpenImageUploadModal}
				setIsOpenModal={setIsOpenImageUploadModal}
				userId={currentUser?.id!}
			/>
			<CurrentLocationUpdateModal
				isOpenModal={isOpenCurrentLocationUpdateModal}
				setIsOpenModal={setIsOpenCurrentLocationUpdateModal}
				userId={currentUser?.id!}
			/>
		</>
	);
});

export const Modalstyle = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: 1,
	boxShadow: 24,
	textAlign: "center",
	width: {
		xs: "250px",
		sm: "300px",
	},
	p: 2,
};
