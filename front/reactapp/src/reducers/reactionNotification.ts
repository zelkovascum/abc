type State = {
	reactionState: "INITIAL" | "REACTION";
};
type Action = {
	type: "PUSHBUTTON";
};

export const reactionInit: State = {
	reactionState: "INITIAL",
};

// reaction通知
export const reactionNotificationReducer = (
	state: State,
	action: Action
): State | never => {
	switch (action.type) {
		case "PUSHBUTTON":
			return {
				reactionState: "REACTION",
			};
		default:
			throw new Error();
	}
};
