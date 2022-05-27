export type ReactionNotificationState = {
	// reactionState: "INITIAL" | "REACTION";
	isAlertMessageOpen: boolean;
	message: string;
};
export type ReactionNotificationAction = {
	type: "CLOSE_MESSAGE" | "PUSHBUTTON";
	payload: string;
};

export const reactionInit: ReactionNotificationState = {
	// reactionState: "INITIAL",
	isAlertMessageOpen: false,
	message: "",
};

// reaction通知
export const reactionNotificationReducer = (
	state: ReactionNotificationState,
	action: ReactionNotificationAction
): ReactionNotificationState | never => {
	switch (action.type) {
		case "CLOSE_MESSAGE":
			return {
				...state,
				// reactionState: "INITIAL" ,
				isAlertMessageOpen: false,
			};
		case "PUSHBUTTON":
			return {
				// reactionState: "REACTION",
				isAlertMessageOpen: true,
				message: action.payload,
			};
		default:
			throw new Error();
	}
};
