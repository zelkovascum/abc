import {
	Dispatch,
	FC,
	memo,
	MouseEvent,
	SetStateAction,
	useState,
} from "react";
import { Box, Button, Modal } from "@mui/material";
import { updateUserCurrentLocation } from "utils/api/user";
import { PlaceInput } from "components/atoms/PlaceInput";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	userId: number;
};

export const CurrentLocationUpdateModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal, userId } = props;
	const [currentLocation, setCurrentLocation] = useState<string>("");

	const handleUpdatePrefectures = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await updateUserCurrentLocation(userId, { address: currentLocation })
			.then((res) => {
				setCurrentLocation("");
				window.location.reload();
			})
			.catch((e) => console.error(e));
	};
	console.log(currentLocation);

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={style} display="flex">
				<PlaceInput
					placeInputValue={currentLocation}
					setPlaceInputValue={setCurrentLocation}
				/>
				<Button
					type="submit"
					onClick={handleUpdatePrefectures}
					// disabled={!prefecturesList.includes(prefectures)}
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
