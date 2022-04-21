import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Header } from "../organisms/Header";

export const CommonLayout: FC = memo(() => {
	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Grid container justifyContent="center">
					<Grid item xs={9}>
						<Outlet />
					</Grid>
				</Grid>
			</Container>
		</>
	);
});
