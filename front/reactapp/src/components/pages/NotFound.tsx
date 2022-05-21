import { Box, Typography } from "@mui/material";
import { FC } from "react";

export const NotFound: FC = () => (
	<Box
		sx={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		}}
	>
		<Typography variant="h4" color="teal">
			404 Not Found
		</Typography>
	</Box>
);
