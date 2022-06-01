import React, { FC, memo } from "react";
import { Grid, Skeleton } from "@mui/material";
import { PostCardStyle } from "components/organisms/posts/PostCard";

export const CardSkeleton: FC = memo(() => {
	return (
		<Grid item>
			<Skeleton variant="rectangular" sx={PostCardStyle} />
		</Grid>
	);
});
