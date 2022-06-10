import { Dispatch, FC, memo, SetStateAction } from "react";
import { Box, Modal, CardMedia } from "@mui/material";
import { Modalstyle } from "components/pages/users/Setting";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	imageUrl: string;
};

export const MessageImageModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal, imageUrl } = props;

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box
				sx={Modalstyle}
				// display="flex"
			>
				<CardMedia component="img" src={imageUrl} alt="" />
				<Box>
					<a href={imageUrl} download={imageUrl}>
						画像ダウンロード
					</a>
				</Box>
			</Box>
		</Modal>
	);
});
