import { ChangeEvent, FC, memo, MouseEvent, useState } from "react";
import {
	Button,
	Card,
	Container,
	Input,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { PlaceInput } from "components/molucules/PlaceInput";
import { DateTimeInput } from "components/molucules/DateTimeInput";
import SendIcon from "@mui/icons-material/Send";
import { ToGeocode } from "utils/ToGeocode";
import { createPost } from "utils/api/post";
import { useNavigate } from "react-router-dom";

// export const PostsNew: FC = memo(() => {
// 	const [placeInputValue, setPlaceInputValue] = useState("");
// 	const [dateTimeValue, setDateTimeValue] = useState<Date | null>(null);
// 	const [content, setContent] = useState<string>("");

// 	const OnClickSubmit = async () => {
// 		const geocode = await ToGeocode(placeInputValue)
// 			.then((res) => {
// 				return res;
// 			})
// 			.catch((error) => {
// 				return error;
// 			});

// 		// const dateTime = dateTimeValue!.getTime() / 1000;
// 		// console.log(dateTime);

// 		postPosts({
// 			lat: geocode.lat,
// 			lng: geocode.lng,
// 			place: placeInputValue,
// 			dateTime: dateTimeValue!,
// 			content: content,
// 		})
// 			.then(() => {
// 				console.log("ok!");
// 			})
// 			.catch(() => {});
// 	};

// 	return (
// 		<Card sx={{ textAlign: "center" }}>
// 			<Container>
// 				<Box width={300} mt={1} mb={2}>
// 					<PlaceInput
// 						placeInputValue={placeInputValue}
// 						setPlaceInputValue={setPlaceInputValue}
// 					/>
// 				</Box>
// 				<Box width={300} mb={2}>
// 					<DateTimeInput
// 						dateTimeValue={dateTimeValue}
// 						setDateTimeValue={setDateTimeValue}
// 					/>
// 				</Box>
// 				<Box width={300} mb={2}>
// 					<TextField
// 						value={content}
// 						onChange={(e) => {
// 							setContent(e.target.value);
// 						}}
// 						sx={{ width: "100%" }}
// 						label="コメント"
// 					/>
// 				</Box>
// 				<Box>
// 					<Button
// 						onClick={() => OnClickSubmit()}
// 						disabled={!(placeInputValue && dateTimeValue && content)}
// 						variant="contained"
// 						component="span"
// 						endIcon={<SendIcon />}
// 					>
// 						投稿
// 					</Button>
// 				</Box>
// 			</Container>
// 		</Card>
// 	);
// });

export const PostsNew: FC = memo(() => {
	const [placeInputValue, setPlaceInputValue] = useState("");
	const [dateTimeInputValue, setDateTimeInputValue] = useState<Date | null>(
		null
	);
	// const [contentInputValue, setContentInputValue] = useState({
	// 	content: "",
	// });
	const [contentInputValue, setContentInputValue] = useState<string>("");

	const navigate = useNavigate();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		// setContentInputValue({
		// 	...contentInputValue,
		// 	[e.target.name]: e.target.value,
		// });
		setContentInputValue(e.target.value);
	};

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const geocode = await ToGeocode(placeInputValue);
		const { lat, lng } = geocode;
		try {
			const res = await createPost({
				lat: lat,
				lng: lng,
				place: placeInputValue,
				date_time: dateTimeInputValue!,
				content: contentInputValue,
			});
			console.log(res.data);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Box width="100%" height="100%" p="40px">
			<Typography sx={{ as: "h1", textAlign: "center" }} mb={4}>
				新規投稿
			</Typography>
			<Box
				sx={{
					width: "240px",
					height: "240px",
					p: "16px",
					bg: "white",
					mx: "auto",
					borderRadius: "md",
					shadow: "md",
					textAlign: "center",
				}}
			>
				{/* <form> */}
				<Stack spacing={4}>
					<PlaceInput
						placeInputValue={placeInputValue}
						setPlaceInputValue={setPlaceInputValue}
					/>
					<DateTimeInput
						dateTimeInputValue={dateTimeInputValue}
						setDateTimeInputValue={setDateTimeInputValue}
					/>
					<Input
						placeholder="content"
						// value={contentInputValue.content}
						value={contentInputValue}
						onChange={(e) => handleChange(e)}
						type="text"
						name="content"
					/>
					<Button
						// bg="teal"
						// color="white"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						投稿
					</Button>
				</Stack>
				{/* </form> */}
			</Box>
		</Box>
	);
});
