// export {};

import React, { FC, memo, SyntheticEvent } from "react";
import { Alert as MuiAlert, Snackbar, AlertProps } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AlertMessageProps = {
	open: boolean;
	setOpen: Function;
	severity: "error" | "success" | "info" | "warning";
	message: string;
};

export const AlertMessage: FC<AlertMessageProps> = memo(
	({ open, setOpen, severity, message }) => {
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
				autoHideDuration={6000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={handleCloseAlertMessage}
			>
				<Alert onClose={handleCloseAlertMessage} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		);
	}
);
