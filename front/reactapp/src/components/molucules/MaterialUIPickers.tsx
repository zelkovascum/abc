import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export const MaterialUIPickers: React.FC = React.memo(() => {
	const [value, setValue] = React.useState<Date | null>(null);

	const handleChange = (newValue: Date | null) => {
		setValue(newValue);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Stack spacing={3}>
				<DateTimePicker
					label="時間を選択"
					inputFormat="yyyy/MM/dd hh:mm"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Stack>
		</LocalizationProvider>
	);
});
