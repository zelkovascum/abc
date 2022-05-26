import React, { Dispatch, FC, memo, SyntheticEvent, useEffect } from "react";
import { Alert as MuiAlert, Snackbar, AlertProps } from "@mui/material";
import { ReactionNotificationAction } from "reducers/reactionNotification";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
	<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

type Props = {
	open: boolean;
	dispatch: Dispatch<ReactionNotificationAction>;
	severity: "error" | "success" | "info" | "warning";
	message: string;
};

export const ReactionAlert: FC<Props> = memo((props) => {
	const { open, dispatch, severity, message } = props;
	const handleCloseAlertMessage = (
		e?: SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;
		dispatch({
			type: "CLOSE_MESSAGE",
			payload: "",
		});
	};

	useEffect(() => {
		dispatch({
			type: "CLOSE_MESSAGE",
			payload: "",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
