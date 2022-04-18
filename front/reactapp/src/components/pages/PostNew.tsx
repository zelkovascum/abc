import { FC, memo, useState } from "react";
import { Button, Card, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { SearchPlace } from "components/molucules/SearchPlace";
import { DTPickers } from "components/molucules/DTPickers";
import SendIcon from "@mui/icons-material/Send";
import { ToGeocode } from "utils/ToGeocode";

export const PostNew: FC = memo(() => {
	const [placeInputValue, setPlaceInputValue] = useState("");
	const [dateTimeValue, setDateTimeValue] = useState<Date | null>(null);
	const [content, setContent] = useState<string>("");

	const OnClickSubmit = async () => {
		const geocode = await ToGeocode(placeInputValue)
			.then((res) => {
				return res;
			})
			.catch((error) => {
				return error;
			});

		console.log(geocode);
		console.log(placeInputValue);
		console.log(dateTimeValue);
		console.log(content);
	};

	return (
		<form>
			<Card sx={{ textAlign: "center" }}>
				<Container>
					<Box width={300} mt={1} mb={2}>
						<SearchPlace
							placeInputValue={placeInputValue}
							setPlaceInputValue={setPlaceInputValue}
						/>
					</Box>
					<Box width={300} mb={2}>
						<DTPickers
							dateTimeValue={dateTimeValue}
							setDateTimeValue={setDateTimeValue}
						/>
					</Box>
					<Box width={300} mb={2}>
						<TextField
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
							}}
							sx={{ width: "100%" }}
							label="コメント"
						/>
					</Box>
					<Box>
						<Button
							onClick={OnClickSubmit}
							disabled={!(placeInputValue && dateTimeValue && content)}
							variant="contained"
							component="span"
							endIcon={<SendIcon />}
						>
							投稿
						</Button>
					</Box>
				</Container>
			</Card>
		</form>
	);
});
