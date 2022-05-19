import { Post } from "types";

type State = {
	fetchState: "INITIAL" | "LOADING" | "OK";
	post: null | Post;
};
type Action = {
	type: "FETCHING" | "FETCH_SUCCESS";
	payload?: null | Post;
};

export const postInit: State = {
	fetchState: "INITIAL",
	post: null,
};

// 投稿詳細用
export const postReducer = (state: State, action: Action): State | never => {
	switch (action.type) {
		case "FETCHING":
			return {
				...state,
				fetchState: "LOADING",
			};
		case "FETCH_SUCCESS":
			return {
				fetchState: "OK",
				post: action.payload!,
			};
		default:
			throw new Error();
	}
};
