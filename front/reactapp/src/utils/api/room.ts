import Cookies from "js-cookie";
import { client } from "./client";

export const getAllRooms = () =>
	client.get("/rooms", {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

export const getDetailRoom = (id: number | string) =>
	client.get(`/rooms/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
