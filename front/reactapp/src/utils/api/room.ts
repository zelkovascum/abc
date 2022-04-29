import Cookies from "js-cookie";
import { client } from "./client";

// ルーム作成
export const createRoom = (id: number) =>
	client.post(
		`/users/${id}/rooms`,
		{},
		{
			headers: {
				"access-token": Cookies.get("_access_token") || "",
				client: Cookies.get("_client") || "",
				uid: Cookies.get("_uid") || "",
			},
		}
	);

// ルーム一覧
export const getAllRooms = () =>
	client.get("/rooms", {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

// ルーム詳細
export const getDetailRoom = (id: number) =>
	client.get(`/rooms/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
