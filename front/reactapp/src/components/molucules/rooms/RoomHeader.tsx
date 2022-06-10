import { FC, memo } from "react";
import { Box, Avatar, Typography } from "@mui/material";

type Props = {
	responsiveWidth: any;
	imageUrl: string | undefined;
	name: string;
};

export const RoomHeader: FC<Props> = memo((props) => {
	const { responsiveWidth, imageUrl, name } = props;

	return (
		<Box
			sx={{
				width: responsiveWidth,
				position: "fixed",
				top: "56px",
				display: "flex",
				alignItems: "center",
				pt: 2,
				pb: 1,
				bgcolor: "white",
				zIndex: 2,
			}}
		>
			<Avatar src={imageUrl} sx={{ mr: 1 }} />
			<Typography height="100%" fontSize="24px" fontWeight="bold" color="teal">
				{name}
			</Typography>
		</Box>
	);
});
