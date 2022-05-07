import { Post } from "types";

type State = {
	fetchState: "INITIAL" | "LOADING" | "OK";
	posts: [] | Post[];
};
type Action = {
	type: "FETCHING" | "FETCH_SUCCESS";
	payload?: [] | Post[];
};

export const postsInit: State = {
	fetchState: "INITIAL",
	posts: [],
};

export const postsReducer = (state: State, action: Action): State | never => {
	switch (action.type) {
		case "FETCHING":
			return {
				...state,
				fetchState: "LOADING",
			};
		case "FETCH_SUCCESS":
			return {
				fetchState: "OK",
				posts: action.payload!,
			};
		default:
			throw new Error();
	}
};
