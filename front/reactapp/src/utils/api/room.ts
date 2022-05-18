import Cookies from "js-cookie";
import { client } from "./client";

// 消す
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

export const getAllRooms = () =>
	client.get("/rooms", {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

export const getDetailRoom = (id: number) =>
	client.get(`/rooms/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
