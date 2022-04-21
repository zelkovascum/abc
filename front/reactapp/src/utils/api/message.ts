import Cookies from "js-cookie";
import { client } from "./client";
import { Message } from "types";

// メッセージ作成
export const createMessage = (id: string, params: Pick<Message, "content">) => {
	return client.post(`/rooms/${id}/messages`, params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};
