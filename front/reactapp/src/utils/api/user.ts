import Cookies from "js-cookie";
import { client } from "./client";
// import { User } from "types";
import axios, { AxiosPromise } from "axios";
import applyCaseMiddleware from "axios-case-converter";

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

// アバターアップデート用
const imageClient = applyCaseMiddleware(
	axios.create({
		baseURL: "http://localhost:3000/api/v1",
		headers: {
			"Content-Type": "multipart/form-data",
		},
	}),
	{
		ignoreHeaders: true,
	}
);

export const updateUserImage = (
	data: FormData,
	userId: number
): AxiosPromise => {
	return imageClient.patch(`/users/${userId}`, data, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};
