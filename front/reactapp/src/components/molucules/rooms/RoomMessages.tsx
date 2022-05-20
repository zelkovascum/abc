import { FC, memo, Ref } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Message } from "types";

type Props = {
	messageBox: Ref<HTMLDivElement>;
	messages: Message[] | undefined;
	otherUserId: number;
};

export const RoomMessages: FC<Props> = memo((props) => {
	const { messageBox, messages, otherUserId } = props;

	return (
		<Box
			ref={messageBox}
			sx={{
				width: "100%",
				position: "relative",
				zIndex: -1,
				top: "50px",
				mb: "115px",
			}}
		>
			{messages?.map((message) => (
				<Grid
					key={message.id}
					container
					justifyContent={
						message.userId === otherUserId ? "flex-start" : "flex-end"
					}
					p={1}
				>
					<Grid item>
						<Card
							sx={{
								backgroundColor:
									message.userId === otherUserId ? "#eeeeee" : "#7986cb",
								wordBreak: "break-all",
							}}
						>
							<Typography
								color={message.userId === otherUserId ? "black" : "white"}
								sx={{ wordWrap: "breakWord", p: 1 }}
							>
								{message.content}
							</Typography>
						</Card>
					</Grid>
				</Grid>
			))}
		</Box>
	);
});
