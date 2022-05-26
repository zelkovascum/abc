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
	ReactionNotificationAction,
	reactionNotificationReducer,
  ReactionNotificationState,
} from "reducers/reactionNotification";

export const ReactionNotificationContext = createContext(
	{} as {
		notificationState: ReactionNotificationState;
		notificationDispatch: Dispatch<ReactionNotificationAction>;
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
