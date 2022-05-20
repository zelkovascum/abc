import { FC, memo, MouseEvent, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Message, User } from "types";
import { getDetailRoom } from "utils/api/room";
import { createMessage } from "utils/api/message";
import { RoomHeader } from "components/molucules/rooms/RoomHeader";
import { RoomMessages } from "components/molucules/rooms/RoomMessages";
import { RoomInputField } from "components/molucules/rooms/RoomInputField";

export const Room: FC = memo(() => {
	const [otherUser, setOtherUser] = useState<User>();
	const [messages, setMessages] = useState<Message[]>();
	const [content, setContent] = useState<string>("");
	const { id } = useParams();
	const inputEl = useRef<HTMLInputElement>(null);
	// スクロール位置指定
	const messageBox = useRef<HTMLDivElement>(null);
	const [isComposed, setIsComposed] = useState(false);

	const handleGetDetailRoom = async (id: any) => {
		try {
			const res = await getDetailRoom(id);
			setOtherUser(res.data.otherUser);
			setMessages(res.data.messages);
			if (messageBox.current) {
				messageBox.current.scrollTop = messageBox.current.scrollHeight + 16;
				messageBox.current.scrollIntoView();
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleSubmit = async (id: string, e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await createMessage(id, { content });
			handleGetDetailRoom(id);
		} catch (e) {
			console.error(e);
		}
		setContent("");
		inputEl.current!.focus();
	};

	useEffect(() => {
		handleGetDetailRoom(id);
	}, [id]);

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
				messageBox={messageBox}
				messages={messages}
				otherUserId={otherUser?.id!}
			/>
			<RoomInputField
				responsiveWidth={responsiveWidth}
				inputEl={inputEl}
				content={content}
				setContent={setContent}
				handleSubmit={handleSubmit}
				paramsId={id!}
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
