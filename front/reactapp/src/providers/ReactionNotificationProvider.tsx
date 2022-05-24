import {
	createContext,
	Dispatch,
	FC,
	memo,
	ReactNode,
	useEffect,
	useReducer,
} from "react";
import {
	reactionInit,
	reactionNotificationReducer,
} from "reducers/reactionNotification";

type State = {
	reactionState: "INITIAL" | "REACTION";
};
type Action = {
	type: "PUSHBUTTON";
};

export const ReactionNotificationContext = createContext(
	{} as {
		notificationState: State;
		notificationDispatch: Dispatch<Action>;
	}
);

type Props = {
	children: ReactNode;
};

export const ReactionNotificationProvider: FC<Props> = memo((props) => {
	const { children } = props;
	const [notificationState, notificationDispatch] = useReducer(
		reactionNotificationReducer,
		reactionInit
	);

	useEffect(() => {}, [notificationState]);

	return (
		<ReactionNotificationContext.Provider
			value={{
				notificationState,
				notificationDispatch,
			}}
		>
			{children}
		</ReactionNotificationContext.Provider>
	);
});
