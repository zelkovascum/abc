import {
	Dispatch,
	FC,
	memo,
	MouseEvent,
	SetStateAction,
	useContext,
} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Modal } from "@mui/material";
import { signOut } from "utils/api/auth";
import { AuthContext } from "providers/AuthProvider";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const SignOutModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal } = props;
	const { setIsSignIn } = useContext(AuthContext);
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

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={style}>
				<Typography fontSize={1}>ログアウトしますか？</Typography>
				<Button type="submit" onClick={handleSignOut} sx={{ fontSize: 1 }}>
					ログアウト
				</Button>
				<Button onClick={() => setIsOpenModal(false)} sx={{ fontSize: 1 }}>
					キャンセル
				</Button>
			</Box>
		</Modal>
	);
});

const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: 1,
	boxShadow: 24,
	width: "60%",
	p: 2,
};
