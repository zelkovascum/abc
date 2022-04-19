import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props = {
	dateTimeInputValue: Date | null;
	setDateTimeInputValue: React.Dispatch<React.SetStateAction<Date | null>>;
};

export const DateTimeInput: React.FC<Props> = React.memo((props) => {
	const { dateTimeInputValue, setDateTimeInputValue } = props;

	const handleChange = (newValue: Date | null) => {
		setDateTimeInputValue(newValue);
	};

	console.log(dateTimeInputValue);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Stack spacing={3}>
				<DateTimePicker
					label="時間を選択"
					inputFormat="yyyy/MM/dd hh:mm"
					value={dateTimeInputValue}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Stack>
		</LocalizationProvider>
	);
});
