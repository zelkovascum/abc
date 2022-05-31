import { FC, memo, useContext } from "react";
import { ReactionAlert } from "components/molucules/reactions/ReactionAlert";
import { ReactionNotificationContext } from "providers/ReactionNotificationProvider";

export const Alerts: FC = memo(() => {
	const { notificationState, notificationDispatch } = useContext(
		ReactionNotificationContext
	);

	return (
		<ReactionAlert
			open={notificationState.isAlertMessageOpen}
			dispatch={notificationDispatch}
			severity="info"
			message={notificationState.message}
		/>
	);
});
