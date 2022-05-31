import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { Header } from "components/organisms/Header";
import { Footer } from "components/organisms/Footer";
import { Alerts } from "components/pages/Alerts";

export const CommonLayout: FC = memo(() => {
	return (
		<Box>
			<Header />
			<Grid container justifyContent="center" py={"64px"}>
				<Grid item>
					<Outlet />
					<Alerts />
				</Grid>
			</Grid>
			<Footer />
		</Box>
	);
});
