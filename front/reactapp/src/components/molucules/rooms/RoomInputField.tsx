import { Dispatch, FC, memo, MouseEvent, Ref, SetStateAction } from "react";
import { Box, TextField, Button } from "@mui/material";

type Props = {
	responsiveWidth: any;
	inputEl: Ref<HTMLInputElement>;
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
	handleSubmit: (id: string, e: MouseEvent<HTMLButtonElement>) => void;
	paramsId: string;
};

export const RoomInputField: FC<Props> = memo((props) => {
	const {
		responsiveWidth,
		inputEl,
		content,
		setContent,
		handleSubmit,
		paramsId,
	} = props;

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
				placeholder="メッセージを入力..."
				type="text"
				autoFocus
				inputRef={inputEl}
				color="primary"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				// onKeyDown={(e) => {
				//   if (isComposed) return;
				//   const text = e.target.value;
				//   if (text === '') return;
				//   if (e.key === 'Enter') {
				//     pushMessage({ name, text });
				//     setText('');
				//     e.preventDefault();
				//   }
				sx={{ width: "80%" }}
			/>
			<Button
				type="submit"
				onClick={(e) => handleSubmit(paramsId, e)}
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
