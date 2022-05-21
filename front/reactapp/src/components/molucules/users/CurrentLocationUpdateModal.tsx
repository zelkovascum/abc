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
import { Modalstyle } from "components/pages/users/Setting";

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

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={Modalstyle} display="flex">
				<PlaceInput
					placeInputValue={currentLocation}
					setPlaceInputValue={setCurrentLocation}
				/>
				<Button
					type="submit"
					onClick={handleUpdatePrefectures}
					disabled={!currentLocation}
				>
					適用
				</Button>
			</Box>
		</Modal>
	);
});
