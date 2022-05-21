import { FC, memo, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Message, User } from "types";
import { getDetailRoom } from "utils/api/room";
import { RoomHeader } from "components/molucules/rooms/RoomHeader";
import { RoomMessages } from "components/molucules/rooms/RoomMessages";
import { RoomInputField } from "components/molucules/rooms/RoomInputField";

export const Room: FC = memo(() => {
	const [otherUser, setOtherUser] = useState<User>();
	const [messages, setMessages] = useState<Message[]>([]);
	const params = useParams();
	const messageRef = useRef<HTMLDivElement>(null);

	const handleGetDetailRoom = async (id: string) => {
		try {
			const res = await getDetailRoom(id);
			setOtherUser(res.data.otherUser);
			setMessages(res.data.messages);
			if (messageRef.current) messageRef.current.scrollIntoView();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetDetailRoom(params.id!);
	}, [params.id]);

	return (
		<Box
			sx={{
				width: responsiveWidth,
			}}
		>
			<RoomHeader
				responsiveWidth={responsiveWidth}
				imageUrl={otherUser?.image?.url}
				name={otherUser?.name!}
			/>
			<RoomMessages
				messageRef={messageRef}
				messages={messages}
				otherUserId={otherUser?.id!}
			/>
			<RoomInputField
				handleGetDetailRoom={handleGetDetailRoom}
				responsiveWidth={responsiveWidth}
				paramsId={params.id!}
			/>
		</Box>
	);
});

const responsiveWidth = {
	xs: "350px",
	sm: "550px",
	md: "750px",
	lg: "900px",
	xl: "1300px",
};
