import { FC, memo, Ref } from "react";
import { Card, CardMedia, Grid, Typography } from "@mui/material";

type Props = {
	messageUserId: number;
	otherUserId: number;
	messageContent: string;
	messageImage: string | undefined;
	messageRef: Ref<HTMLDivElement>;
};

export const RoomMessage: FC<Props> = memo((props) => {
	const {
		messageUserId,
		otherUserId,
		messageContent,
		messageImage,
		messageRef,
	} = props;

	return (
		<Grid
			ref={messageRef}
			container
			justifyContent={messageUserId === otherUserId ? "flex-start" : "flex-end"}
			p={1}
		>
			<Grid item>
				<Card
					sx={{
						backgroundColor:
							messageUserId === otherUserId ? "#eeeeee" : "#7986cb",
						wordBreak: "break-all",
					}}
				>
					<CardMedia component="img" alt="" image={messageImage} />
					<Typography
						color={messageUserId === otherUserId ? "black" : "white"}
						sx={{ wordWrap: "breakWord", p: 1 }}
					>
						{messageContent}
					</Typography>
				</Card>
			</Grid>
		</Grid>
	);
});
