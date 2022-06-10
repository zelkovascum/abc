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

export const NameUpdateModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal, userId } = props;
	const [name, setName] = useState<string>("");

	const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await updateUser(userId, { name: name })
			.then((res) => {
				setName("");
				window.location.reload();
			})
			.catch((e) => console.error(e));
	};

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={Modalstyle} display="flex">
				<TextField
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					fullWidth
				/>
				<Button type="submit" onClick={handleUpdate} disabled={!name}>
					適用
				</Button>
			</Box>
		</Modal>
	);
});
