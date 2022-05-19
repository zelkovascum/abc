import React, { FC, memo } from "react";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
} from "@mui/material";

export const RoomSkeleton: FC = memo(() => {
	return (
		<ListItem sx={{ mb: 1 }}>
			<ListItemAvatar>
				<Skeleton variant="circular" width={40} height={40} />
			</ListItemAvatar>
			<ListItemText
				primary={<Skeleton width={90} />}
				secondary={<Skeleton width={185} />}
			/>
		</ListItem>
	);
});
