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
import { Modalstyle } from "components/pages/users/Setting";

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
				console.log("sign out successful");
			} else {
				console.log("sign out failed");
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={Modalstyle}>
				<Typography fontSize={1}>ログアウトしますか？</Typography>
				<Button type="submit" onClick={handleSignOut}>
					ログアウト
				</Button>
				<Button onClick={() => setIsOpenModal(false)}>キャンセル</Button>
			</Box>
		</Modal>
	);
});

