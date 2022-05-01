import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Grid, useMediaQuery } from "@mui/material";
import { Top } from "components/pages/Top";
import Image from "images/topImg.jpg";
import { theme } from "providers/MuiThemeProvider";

export const TopLayout: FC = memo(() => {
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			direction={matches ? "column-reverse" : undefined}
			sx={{
				height: matches ? "150vh" : "100vh",
				backgroundImage: `url(${Image})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				opacity: "0.8",
			}}
		>
			<Grid item xs={5}>
				<Top />
			</Grid>
			<Grid item xs={5}>
				<Outlet />
			</Grid>
		</Grid>
	);
});
