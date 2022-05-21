import { Dispatch, FC, memo, SetStateAction } from "react";
import { Button, Grid } from "@mui/material";
import { DateTimeInput } from "components/atoms/posts/DateTimeInput";

type Props = {
	dateTimeInputValue: Date | null;
	setDateTimeInputValue: Dispatch<SetStateAction<Date | null>>;
	handleSearch: () => void;
};

export const SearchByDateTime: FC<Props> = memo((props) => {
	const { dateTimeInputValue, setDateTimeInputValue, handleSearch } = props;

	return (
		<Grid container alignItems="center">
			<Grid item xs={9}>
				<DateTimeInput
					dateTimeInputValue={dateTimeInputValue}
					setDateTimeInputValue={setDateTimeInputValue}
				/>
			</Grid>
			<Grid item xs={3}>
				<Button
					onClick={() => handleSearch()}
					disabled={!dateTimeInputValue}
					sx={{ fontSize: "5px" }}
				>
					この日時
					<br />
					以降で 検索
				</Button>
			</Grid>
		</Grid>
	);
});
