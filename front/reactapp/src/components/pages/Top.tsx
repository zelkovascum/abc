import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";

export const Top: FC = memo(() => (
	<Box margin="auto">
		<Box>
			<Typography align="center">Concept</Typography>
			<Typography align="center">Concept</Typography>
		</Box>
		<Box>
			<Typography align="center">How to use</Typography>
			<Typography align="center">How to use</Typography>
		</Box>
	</Box>
));
