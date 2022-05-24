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

export const NotificationContext = createContext(
	{} as {
		notificationState: State;
		notificationDispatch: Dispatch<Action>;
	}
);

type Props = {
	children: ReactNode;
};

export const NotificationProvider: FC<Props> = memo((props) => {
	const { children } = props;
	const [notificationState, notificationDispatch] = useReducer(
		reactionNotificationReducer,
		reactionInit
	);

	useEffect(() => {}, [notificationState]);

	return (
		<NotificationContext.Provider
			value={{
				notificationState,
				notificationDispatch,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
});
