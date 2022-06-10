import { Dispatch, FC, memo, SetStateAction } from "react";
import { Box, Modal, CardMedia, Button, Link } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

type Props = {
	isOpenModal: boolean;
	setIsOpenModal: Dispatch<SetStateAction<boolean>>;
	imageUrl: string;
};

export const MessageImageModal: FC<Props> = memo((props) => {
	const { isOpenModal, setIsOpenModal, imageUrl } = props;

	return (
		<Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
			<Box sx={style}>
				<CardMedia
					component="img"
					src={imageUrl}
					alt=""
					sx={{ maxHeight: "400px" }}
				/>
				<Box textAlign="center">
					{/* productionで動作 */}
					<Button sx={{ mt: 1 }}>
						<Link href={imageUrl} download={imageUrl}>
							保存
							<DownloadIcon sx={{ verticalAlign: "-7px" }} />
						</Link>
					</Button>
				</Box>
			</Box>
		</Modal>
	);
});

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 300,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 2,
};
