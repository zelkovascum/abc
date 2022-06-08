import { FC, memo, Ref } from "react";
import { Box } from "@mui/material";
import { Message } from "types";
import { RoomMessage } from "components/atoms/rooms/RoomMessage";

type Props = {
	messages: Message[] | [];
	otherUserId: number;
	messageRef: Ref<HTMLDivElement>;
};

export const RoomMessages: FC<Props> = memo((props) => {
	const { messages, otherUserId, messageRef } = props;

	return (
		<Box
			sx={{
				width: "100%",
				position: "relative",
				zIndex: -1,
				top: "50px",
				mb: "115px",
			}}
		>
			{messages?.map((message) => (
				<RoomMessage
					key={message.id}
					messageUserId={message.userId}
					otherUserId={otherUserId}
					messageContent={message.content}
					messageImage={message.image?.url}
					messageRef={messageRef}
				/>
			))}
		</Box>
	);
});
