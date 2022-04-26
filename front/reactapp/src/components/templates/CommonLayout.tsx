import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Header } from "../organisms/Header";

export const CommonLayout: FC = memo(() => {
	return (
		<Container>
			<Header />
			<Container>
				<Grid container justifyContent="center">
					<Grid item>
						<Outlet />
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
});
