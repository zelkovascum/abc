import { FC, memo, MouseEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Message, User } from "types";
import { getDetailRoom } from "utils/api/room";
import { createMessage } from "utils/api/message";

export const Room: FC = memo(() => {
	const [otherUser, setOtherUser] = useState<User>();
	const [messages, setMessages] = useState<Message[]>();
	const [content, setContent] = useState<string>("");

	// スクロール位置指定
	const messageBox = useRef<HTMLDivElement>(null);

	const query = useParams();

	const handleGetDetailRoom = async (query: any) => {
		try {
			const res = await getDetailRoom(query.id);
			console.log(res.data);
			setOtherUser(res.data.otherUser);
			setMessages(res.data.messages);
			if (messageBox.current) {
				messageBox.current.scrollTop = messageBox.current.scrollHeight + 16;
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmit = async (query: any, e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const res = await createMessage(query.id, { content: content });
			console.log(res.data);
			handleGetDetailRoom(query);
		} catch (e) {
			console.log(e);
		}
		setContent("");
	};

	useEffect(() => {
		handleGetDetailRoom(query);
	}, [query]);

	return (
		<Box width="100%" height="100%" p="40px">
			<Typography sx={{ as: "h1", textAlign: "center" }} mb={4}>
				DM詳細
			</Typography>
			<Box
				sx={{
					textAlign: "center",
					mx: "auto",
					width: "500px",
					height: "20%",
					p: "16px",
					bg: "white",
					mb: "16px",
					borderRadius: "md",
					shadow: "md",
				}}
			>
				<Typography color="teal" fontSize="24px" fontWeight="bold">
					{otherUser?.name}
				</Typography>
				<Typography>{otherUser?.email}</Typography>
			</Box>
			<Box
				ref={messageBox}
				sx={{
					width: "500px",
					height: "500px",
					bg: "white",
					mx: "auto",
					borderRadius: "md",
					shadow: "md",
					overflow: "scroll",
				}}
			>
				{messages?.map((message) => (
					<Box key={message.id} p="16px">
						<Grid
							justifyContent={
								message.userId === otherUser?.id ? "flex-start" : "flex-end"
							}
						>
							<Typography
								color={message.userId === otherUser?.id ? "teal" : "red"}
							>
								{`${
									message.userId === otherUser?.id ? otherUser?.name : "自分"
								}:${message.content}`}
							</Typography>
						</Grid>
					</Box>
				))}
			</Box>
			<Box sx={{ width: "500px", mx: "auto", bg: "teal", p: "16px" }}>
				<form>
					<Grid>
						<Input
							placeholder="content"
							type="text"
							name="content"
							id="content"
							color="primary"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<Button type="submit" onClick={(e) => handleSubmit(query, e)}>
							送信
						</Button>
					</Grid>
				</form>
			</Box>
		</Box>
	);
});
