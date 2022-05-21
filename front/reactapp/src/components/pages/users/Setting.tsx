import { FC, memo, useContext, useState } from "react";
import { Avatar, Button, Box, Typography, Stack, Divider } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { ImageUploadModal } from "components/molucules/users/ImageUploadModal";
import { CurrentLocationUpdateModal } from "components/molucules/users/CurrentLocationUpdateModal";
import { SignOutModal } from "components/molucules/users/SignOutModal";
import { transformPlace } from "utils/transformForRead";

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
			<Stack spacing={2} sx={{ p: 2, textAlign: "center" }}>
				<Box display="flex">
					<Avatar
						alt={currentUser?.name}
						src={`${currentUser!.image?.url}`}
						sx={{ width: 50, height: 50 }}
					/>
					<Button onClick={() => setIsOpenImageUploadModal(true)}>
						プロフィール画像を変更
					</Button>
				</Box>
				<Divider />
				<Typography>ユーザーネーム: {currentUser?.name}</Typography>
				<Divider />
				<Typography>
					住所:{" "}
					{currentUser?.address
						? transformPlace(currentUser?.address)
						: "未設定"}
				</Typography>
				<Button onClick={() => setIsOpenCurrentLocationUpdateModal(true)}>
					住所を変更
				</Button>
				<Divider />
				<Button onClick={() => setIsOpenSignOutModal(true)}>ログアウト</Button>
			</Stack>
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
