import { FC, memo, useContext } from "react";
import { ReactionNotificationContext } from "providers/ReactionNotificationProvider";
import { Reactions } from "./Reactions";
import { ReactionAlert } from "components/molucules/reactions/ReactionAlert";

export const ReactionsAndAlert: FC = memo(() => {
	const { notificationState, notificationDispatch } = useContext(
		ReactionNotificationContext
	);

	return (
		<>
			<Reactions />
			<ReactionAlert
				open={notificationState.isAlertMessageOpen}
				dispatch={notificationDispatch}
				severity="info"
				message={notificationState.message}
			/>
		</>
	);
});
