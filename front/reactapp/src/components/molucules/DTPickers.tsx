import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props = {
	dateTimeValue: Date | null;
	setDateTimeValue: React.Dispatch<React.SetStateAction<Date | null>>;
};

export const DTPickers: React.FC<Props> = React.memo((props) => {
	// const [value, setValue] = React.useState<Date | null>(null);
	const { dateTimeValue, setDateTimeValue } = props;

	const handleChange = (newValue: Date | null) => {
		setDateTimeValue(newValue);
	};

	console.log(dateTimeValue);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Stack spacing={3}>
				<DateTimePicker
					label="時間を選択"
					inputFormat="yyyy/MM/dd hh:mm"
					value={dateTimeValue}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Stack>
		</LocalizationProvider>
	);
});
