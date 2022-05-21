import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Grid, useMediaQuery, Box } from "@mui/material";
import { Top } from "components/pages/Top";
import Image from "images/topImg.jpg";
import { theme } from "providers/MuiThemeProvider";

export const TopLayout: FC = memo(() => {
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box
			sx={{
				backgroundImage: `url(${Image})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div style={{ background: "rgba(255, 255, 255, 0.5)" }}>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					direction={matches ? "column-reverse" : undefined}
					sx={{
						height: matches ? "150vh" : "100vh",
					}}
				>
					<Grid item xs={5}>
						<Top />
					</Grid>
					<Grid item xs={5}>
						<Outlet />
					</Grid>
				</Grid>
			</div>
		</Box>
	);
});
