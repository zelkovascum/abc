import {
	FC,
	memo,
	useState,
	useRef,
	KeyboardEvent,
	ChangeEvent,
	useCallback,
} from "react";
import { Box, TextField, Button, Input } from "@mui/material";
import { createMessage } from "utils/api/message";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
	const [image, setImage] = useState<File>();

	const uploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.files![0]);
	}, []);

	const createFormData = (id: string): FormData => {
		const formData = new FormData();
		formData.append("roomId", id);
		if (content) formData.append("content", content);
		if (image) formData.append("image", image);
		return formData;
	};

	const handleSubmit = async (id: string) => {
		const data = await createFormData(id);
		await createMessage(id, data)
			.then((res) => {
				handleGetDetailRoom(id);
				setContent("");
				setImage(undefined);
				inputRef.current!.focus();
			})
			.catch((e) => console.error(e));
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (isCompose) return;
		if (content === "") return;
		if (e.key === "Enter") {
			handleSubmit(paramsId);
			setContent("");
			e.preventDefault();
		}
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
				zIndex: 2,
			}}
		>
			<TextField
				sx={{ width: "70%", color: "primary" }}
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
			<Button component="label" variant="outlined" sx={{ width: "10%", ml: 1 }}>
				{image ? <CheckCircleIcon /> : <AddPhotoAlternateIcon />}
				<Input
					type="file"
					// accept="image/*"
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						uploadImage(e);
					}}
					sx={{ display: "none", fontSize: 10 }}
				/>
			</Button>
			<Button
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(paramsId);
				}}
				disabled={!content && !image}
				variant="contained"
				sx={{
					width: "20%",
					ml: 1,
				}}
			>
				送信
			</Button>
		</Box>
	);
});
