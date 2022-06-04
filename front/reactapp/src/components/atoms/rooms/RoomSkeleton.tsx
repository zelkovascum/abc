import React, { FC, memo } from "react";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Divider,
} from "@mui/material";

export const RoomSkeleton: FC = memo(() => {
	return (
		<>
			<Divider />
			<ListItem sx={{ mx: "auto" }}>
				<ListItemAvatar>
					<Skeleton variant="circular" width={40} height={40} />
				</ListItemAvatar>
				<ListItemText
					primary={
						<Skeleton
							sx={{
								width: "100px",
							}}
						/>
					}
					secondary={
						<Skeleton
							sx={{
								width: {
									xs: "200px",
									sm: "300px",
									md: "400px",
									lg: "500px",
									xl: "600px",
								},
							}}
						/>
					}
				/>
			</ListItem>
		</>
	);
});
