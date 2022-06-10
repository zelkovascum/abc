type User = {
	id: number;
	name: string;
	image: { url: string };
	sns: string;
};

type State = {
	fetchState: "INITIAL" | "LOADING" | "OK";
	user: null | User;
	roomId: null | number;
};
type Action = {
	type: "FETCHING" | "FETCH_SUCCESS";
	userPayload: null | User;
	roomPayload: null | number;
};

export const userInit: State = {
	fetchState: "INITIAL",
	user: null,
	roomId: null,
};

// プロフィール用
export const userReducer = (state: State, action: Action): State | never => {
	switch (action.type) {
		case "FETCHING":
			return {
				...state,
				fetchState: "LOADING",
			};
		case "FETCH_SUCCESS":
			return {
				fetchState: "OK",
				user: action.userPayload!,
				roomId: action.roomPayload!,
			};
		default:
			throw new Error();
	}
};
