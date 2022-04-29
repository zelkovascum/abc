import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Top } from "components/pages/Top";

export const TopLayout: FC = memo(() => (
	<Container maxWidth="lg">
		<Grid container justifyContent="center">
			<Grid item xs={6}>
				<Top />
			</Grid>
			<Grid item xs={6}>
				<Outlet />
			</Grid>
		</Grid>
	</Container>
));
