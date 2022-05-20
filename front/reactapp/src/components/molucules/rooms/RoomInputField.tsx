import { FC, memo, useState, useRef, KeyboardEvent } from "react";
import { Box, TextField, Button } from "@mui/material";
import { createMessage } from "utils/api/message";

type Props = {
	handleGetDetailRoom: (id: any) => void;
	responsiveWidth: any;
	paramsId: string;
};

export const RoomInputField: FC<Props> = memo((props) => {
	const { handleGetDetailRoom, responsiveWidth, paramsId } = props;
	const inputRef = useRef<HTMLInputElement>(null);
	// 日本語入力監視
	const [isCompose, setIsCompose] = useState<boolean>(false);
	const [content, setContent] = useState<string>("");

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (isCompose) return;
		if (content === "") return;
		if (e.key === "Enter") {
			handleSubmit(paramsId);
			setContent("");
			e.preventDefault();
		}
	};

	const handleSubmit = async (id: string) => {
		try {
			await createMessage(id, { content });
			handleGetDetailRoom(id);
		} catch (e) {
			console.error(e);
		}
		setContent("");
		inputRef.current!.focus();
	};

	return (
		<Box
			sx={{
				width: responsiveWidth,
				position: "fixed",
				bottom: "56px",
				display: "flex",
				alignItems: "center",
				pt: 1,
				pb: 2,
				bgcolor: "white",
			}}
		>
			<TextField
				sx={{ width: "80%", color: "primary" }}
				type="text"
				placeholder="メッセージを入力..."
				autoFocus
				inputRef={inputRef}
				value={content}
				onCompositionStart={() => setIsCompose(true)}
				onCompositionEnd={() => setIsCompose(false)}
				onChange={(e) => setContent(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
			/>
			<Button
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(paramsId);
				}}
				disabled={!content}
				variant="contained"
				sx={{
					width: "20%",
					height: "100%",
					margin: 1,
				}}
			>
				送信
			</Button>
		</Box>
	);
});
