import React, { FC, memo } from "react";
import { Grid, Skeleton } from "@mui/material";

export const HomeSkeleton: FC = memo(() => {
	return (
		<Grid item>
			<Skeleton
				variant="rectangular"
				sx={{
					width: {
						xs: "250px",
						sm: "350px",
						md: "450px",
						lg: "550px",
						xl: "600px",
					},
					height: "220px",
					borderRadius: 1,
					p: 2,
				}}
			/>
		</Grid>
	);
});
