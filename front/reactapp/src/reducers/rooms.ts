import { Room } from "types";

type State = {
	fetchState: "INITIAL" | "LOADING" | "OK";
	rooms: [] | Room[];
};
type Action = {
	type: "FETCHING" | "FETCH_SUCCESS";
	payload?: [] | Room[];
};

export const roomsInit: State = {
	fetchState: "INITIAL",
	rooms: [],
};

// DM一覧用
export const roomsReducer = (state: State, action: Action): State | never => {
	switch (action.type) {
		case "FETCHING":
			return {
				...state,
				fetchState: "LOADING",
			};
		case "FETCH_SUCCESS":
			return {
				fetchState: "OK",
				rooms: action.payload!,
			};
		default:
			throw new Error();
	}
};
