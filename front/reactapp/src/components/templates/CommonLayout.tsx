import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { Header } from "components/organisms/Header";
import { Footer } from "components/organisms/Footer";

export const CommonLayout: FC = memo(() => (
	<Box>
		<Header />
		<Grid container justifyContent="center" py={"64px"}>
			<Grid item>
				<Outlet />
			</Grid>
		</Grid>
		<Footer />
	</Box>
));
