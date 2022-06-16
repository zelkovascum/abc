import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/material";
import ja from "date-fns/locale/ja";

type Props = {
	dateTimeInputValue: Date | null;
	setDateTimeInputValue: React.Dispatch<React.SetStateAction<Date | null>>;
};

const now = new Date();

export const DateTimeInput: React.FC<Props> = React.memo((props) => {
	const { dateTimeInputValue, setDateTimeInputValue } = props;

	const handleChange = (newValue: Date | null) => {
		setDateTimeInputValue(newValue);
	};

	return (
		<Box
			sx={{
				width: "100%",
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
				<Stack spacing={3}>
					<DateTimePicker
						label=""
						minDateTime={now}
						value={dateTimeInputValue}
						onChange={handleChange}
						inputFormat="yyyy/MM/dd hh:mm"
						mask="____/__/__ __:__"
						renderInput={(params) => <TextField {...params} />}
					/>
				</Stack>
			</LocalizationProvider>
		</Box>
	);
});
