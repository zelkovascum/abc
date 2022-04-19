import Cookies from "js-cookie";
import { User } from "types";
import { client } from "./client";

export const getDetailUser = (id: number) => {
	return client.get(`/users/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};

export const updateUser = (id: number, params: Pick<User, "name">) => {
	return client.patch(`/users/${id}`, params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};
