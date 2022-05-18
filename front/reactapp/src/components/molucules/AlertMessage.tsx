import React, { FC, memo, SyntheticEvent } from "react";
import { Alert as MuiAlert, Snackbar, AlertProps } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
	<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

type Props = {
	open: boolean;
	setOpen: Function;
	severity: "error" | "success" | "info" | "warning";
	message: string;
};

export const AlertMessage: FC<Props> = memo((props) => {
	const { open, setOpen, severity, message } = props;
	const handleCloseAlertMessage = (
		e?: SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			onClose={handleCloseAlertMessage}
		>
			<Alert onClose={handleCloseAlertMessage} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
});
