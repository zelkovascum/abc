import Cookies from "js-cookie";
import { Message } from "types";
import { client } from "./client";

// メッセージ作成
export const createMessage = (id: string, params: Pick<Message, "content">) =>
	client.post(`/rooms/${id}/messages`, params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
