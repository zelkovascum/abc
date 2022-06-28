import { FC, memo, useContext, useState } from "react";
import {
	Avatar,
	Button,
	Box,
	Typography,
	Stack,
	Divider,
	Link,
} from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { ImageUploadModal } from "components/molucules/users/ImageUploadModal";
import { CurrentLocationUpdateModal } from "components/molucules/users/CurrentLocationUpdateModal";
import { SignOutModal } from "components/molucules/users/SignOutModal";
import { transformPlace } from "utils/transformForRead";
import { SnsUpdateModal } from "components/molucules/users/SnsUpdateModal";
import { NameUpdateModal } from "components/molucules/users/NameUpdateModal";

export const Setting: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [isOpenImageUploadModal, setIsOpenImageUploadModal] = useState(false);
	const [isOpenNameUpdateModal, setIsOpenNameUpdateModal] = useState(false);
	const [
		isOpenCurrentLocationUpdateModal,
		setIsOpenCurrentLocationUpdateModal,
	] = useState(false);
	const [isOpenSnsUpdateModal, setIsOpenSnsUpdateModal] = useState(false);
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
				<Button
					disabled={currentUser?.email === "guest@mail.com"}
					onClick={() => setIsOpenNameUpdateModal(true)}
				>
					ユーザーネームを変更
				</Button>
				<Divider />
				<Typography>
					現在地設定:{" "}
					{currentUser?.address
						? transformPlace(currentUser?.address)
						: "未設定"}
				</Typography>
				<Button onClick={() => setIsOpenCurrentLocationUpdateModal(true)}>
					現在地を変更
				</Button>
				<Divider />
				<Typography>
					SNSリンク:{" "}
					{currentUser?.sns ? (
						<Link href={currentUser?.sns}>{currentUser?.sns}</Link>
					) : (
						"未設定"
					)}
				</Typography>
				<Button onClick={() => setIsOpenSnsUpdateModal(true)}>
					SNSリンク変更
				</Button>
				<Divider />
				<Button onClick={() => setIsOpenSignOutModal(true)}>ログアウト</Button>
			</Stack>
			<ImageUploadModal
				isOpenModal={isOpenImageUploadModal}
				setIsOpenModal={setIsOpenImageUploadModal}
				userId={currentUser?.id!}
			/>
			<NameUpdateModal
				isOpenModal={isOpenNameUpdateModal}
				setIsOpenModal={setIsOpenNameUpdateModal}
				userId={currentUser?.id!}
			/>
			<CurrentLocationUpdateModal
				isOpenModal={isOpenCurrentLocationUpdateModal}
				setIsOpenModal={setIsOpenCurrentLocationUpdateModal}
				userId={currentUser?.id!}
			/>
			<SnsUpdateModal
				isOpenModal={isOpenSnsUpdateModal}
				setIsOpenModal={setIsOpenSnsUpdateModal}
				userId={currentUser?.id!}
			/>
			<SignOutModal
				isOpenModal={isOpenSignOutModal}
				setIsOpenModal={setIsOpenSignOutModal}
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
