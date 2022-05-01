import {
	Dispatch,
	FC,
	memo,
	MouseEvent,
	SetStateAction,
	useState,
} from "react";
import { Box, Button, Modal } from "@mui/material";
import { updateUserPrefectures } from "utils/api/user";
import {
	prefecturesList,
	SelectPrefectures,
} from "components/molucules/SelectPrefectures";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	userId: number;
};

export const UpdatePrefecturesModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal, userId } = props;
	const [prefectures, setPrefectures] = useState<string>("");

	const handleUpdatePrefectures = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await updateUserPrefectures(userId, { address: prefectures })
			.then((res) => {
				setPrefectures("");
				window.location.reload();
			})
			.catch((e) => console.error(e));
	};
	console.log(prefectures);

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={style} display="flex">
				<SelectPrefectures
					prefectures={prefectures}
					setPrefectures={setPrefectures}
				/>
				<Button
					type="submit"
					onClick={handleUpdatePrefectures}
					disabled={!prefecturesList.includes(prefectures)}
					sx={{ fontSize: 1 }}
				>
					適用
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
