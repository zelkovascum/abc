import { ChangeEvent, FC, memo, MouseEvent, useRef, useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { PlaceInput } from "components/atoms/PlaceInput";
import { DateTimeInput } from "components/atoms/posts/DateTimeInput";
import SendIcon from "@mui/icons-material/Send";
import { toGeocode } from "utils/ToGeocode";
import { createPost } from "utils/api/post";
import { useNavigate } from "react-router-dom";

export const NewPost: FC = memo(() => {
	const [placeInputValue, setPlaceInputValue] = useState<string>("");
	const [dateTimeInputValue, setDateTimeInputValue] = useState<Date | null>(
		null
	);
	const [contentInputValue, setContentInputValue] = useState<string>("");
	const navigate = useNavigate();
	const processing = useRef(false);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setContentInputValue(e.target.value);
	};

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (processing.current) return;
		processing.current = true;
		const geocode = await toGeocode(placeInputValue);
		const { lat, lng } = geocode!;
		try {
			await createPost({
				lat,
				lng,
				place: placeInputValue,
				dateTime: dateTimeInputValue!,
				content: contentInputValue,
			});
			navigate("/");
			processing.current = false;
		} catch (e) {
			console.error(e);
			processing.current = false;
		}
	};

	return (
		// <Box
		// 	sx={{
		// 		width: {
		// 			xs: "300px",
		// 			sm: "400px",
		// 			md: "500px",
		// 			lg: "600px",
		// 			xl: "650px",
		// 		},
		// 		p: "40px",
		// 	}}
		// >
		<Card
			sx={{
				width: {
					xs: "280px",
					sm: "400px",
					md: "500px",
					lg: "600px",
					xl: "700px",
				},
				my: 2,
				p: 3,
				borderRadius: "md",
				shadow: "md",
			}}
		>
			<Stack spacing={1.5}>
				<Typography sx={{ textAlign: "center" }}>新規</Typography>
				<Box>
					<Typography ml={2}>場所</Typography>
					<PlaceInput
						placeInputValue={placeInputValue}
						setPlaceInputValue={setPlaceInputValue}
					/>
				</Box>
				<Box>
					<Typography ml={2}>日時</Typography>
					<DateTimeInput
						dateTimeInputValue={dateTimeInputValue}
						setDateTimeInputValue={setDateTimeInputValue}
					/>
				</Box>
				{/* <Box>
					<Typography ml={2}>*****</Typography>
					<TextField type="text" sx={{ width: "100%" }} />
				</Box> */}
				<Box>
					<Typography ml={2}>コメント</Typography>
					<TextField
						value={contentInputValue}
						onChange={(e) => handleChange(e)}
						type="text"
						sx={{ width: "100%" }}
					/>
				</Box>
				<Button
					type="submit"
					onClick={(e) => handleSubmit(e)}
					disabled={
						!(placeInputValue && dateTimeInputValue && contentInputValue)
					}
					endIcon={<SendIcon />}
					variant="contained"
				>
					投稿
				</Button>
			</Stack>
		</Card>
		// </Box>
	);
});
