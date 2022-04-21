import Cookies from "js-cookie";
import { client } from "./client";
// import { User } from "types";

export const getDetailUser = (id: string) => {
	return client.get(`/users/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};

// export const updateUser = (id: number, params: Pick<User, "name">) => {
// 	return client.patch(`/users/${id}`, params, {
// 		headers: {
// 			"access-token": Cookies.get("_access_token") || "",
// 			client: Cookies.get("_client") || "",
// 			uid: Cookies.get("_uid") || "",
// 		},
// 	});
// };
