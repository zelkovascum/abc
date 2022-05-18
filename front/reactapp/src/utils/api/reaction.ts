import Cookies from "js-cookie";
import { client } from "./client";
import { Reaction } from "types";

export const getAllReactions = () =>
	client.get("/reactions", {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

// リアクション
export const createReaction = (params: Reaction) =>
	client.post(`/reactions`, params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
