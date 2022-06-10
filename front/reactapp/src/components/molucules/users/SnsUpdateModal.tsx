import {
	Dispatch,
	FC,
	memo,
	MouseEvent,
	SetStateAction,
	useState,
} from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { updateUser } from "utils/api/user";
import { Modalstyle } from "components/pages/users/Setting";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	userId: number;
};

export const SnsUpdateModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal, userId } = props;
	const [snsLink, setSnsLink] = useState<string>("");

	const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await updateUser(userId, { sns: snsLink })
			.then((res) => {
				setSnsLink("");
				window.location.reload();
			})
			.catch((e) => console.error(e));
	};

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={Modalstyle} display="flex">
				<TextField
					type="text"
					value={snsLink}
					onChange={(e) => setSnsLink(e.target.value)}
					fullWidth
				/>
				<Button type="submit" onClick={handleUpdate} disabled={!snsLink}>
					適用
				</Button>
			</Box>
		</Modal>
	);
});
