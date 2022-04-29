import { FC, memo, MouseEvent, useEffect, useRef, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Card,
	Grid,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Message, User } from "types";
import { getDetailRoom } from "utils/api/room";
import { createMessage } from "utils/api/message";

export const Room: FC = memo(() => {
	const [otherUser, setOtherUser] = useState<User>();
	const [messages, setMessages] = useState<Message[]>();
	const [content, setContent] = useState<string>("");
	const { id } = useParams();

	// スクロール位置指定
	const messageBox = useRef<HTMLDivElement>(null);

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
	};

	useEffect(() => {
		handleGetDetailRoom(id);
	}, [id]);

	return (
		<Box height="85vh">
			<Toolbar
				sx={{
					textAlign: "center",
					mx: "auto",
					p: 0.5,
					bg: "white",
				}}
			>
				<Avatar src={otherUser?.image?.url} />
				<Typography
					height="100%"
					color="teal"
					fontSize="24px"
					fontWeight="bold"
				>
					{otherUser?.name}
				</Typography>
			</Toolbar>
			<Box
				ref={messageBox}
				sx={{
					height: "80%",
					bg: "white",
					mx: "auto",
					p: 1,
					border: "none",
					overflowY: "scroll",
				}}
			>
				{messages?.map((message) => (
					<Grid
						key={message.id}
						container
						wrap="wrap"
						justifyContent={
							message.userId === otherUser?.id ? "flex-start" : "flex-end"
						}
						p={1}
					>
						<Grid item>
							<Card
								sx={{
									backgroundColor:
										message.userId === otherUser?.id ? "#eeeeee" : "#7986cb",
								}}
							>
								<Typography
									color={message.userId === otherUser?.id ? "black" : "white"}
									p={1}
								>
									{message.content}
								</Typography>
							</Card>
						</Grid>
					</Grid>
				))}
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					mx: "auto",
					bg: "teal",
					m: 1,
				}}
			>
				{/* <form> */}
				{/* <Grid> */}
				<TextField
					placeholder="メッセージを入力..."
					type="text"
					// name="content"
					// id="content"
					color="primary"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					sx={{ width: "80%" }}
				/>
				<Button
					type="submit"
					onClick={(e) => handleSubmit(id!, e)}
					disabled={!content}
					variant="contained"
					sx={{ width: "20%", height: "100%", margin: 1 }}
				>
					送信
				</Button>
				{/* </Grid> */}
				{/* </form> */}
			</Box>
		</Box>
	);
});
