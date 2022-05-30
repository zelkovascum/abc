import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import { Top } from "components/pages/top/Top";
import Image from "images/topImg.jpg";
import { TopHeader } from "components/pages/top/TopHeader";

export const TopLayout: FC = memo(() => {
	return (
		<Grid
			container
			justifyContent="center"
			direction="column"
			sx={{
				height: "200vh",
			}}
		>
			<Grid
				item
				xs={6}
				sx={{
					height: "100%",
					backgroundImage: `url(${Image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Box
					sx={{
						height: "100%",
						background: "rgba(255, 255, 255, 0.5)",
					}}
				>
					<TopHeader />
					<Outlet />
					<div className="scrolldown">
						<span>Scroll</span>
					</div>
				</Box>
			</Grid>
			<Grid item xs={6} height="100%">
				<Top />
			</Grid>
		</Grid>
	);
});
