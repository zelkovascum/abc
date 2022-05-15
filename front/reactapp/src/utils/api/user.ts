import Cookies from "js-cookie";
import { User } from "types";
import axios, { AxiosPromise } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { client } from "./client";

export const getDetailUser = (id: string) =>
	client.get(`/users/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

// export const updateUser = (id: number, params: Pick<User, "name">) => {
// 	return client.patch(`/users/${id}`, params, {
// 		headers: {
// 			"access-token": Cookies.get("_access_token") || "",
// 			client: Cookies.get("_client") || "",
// 			uid: Cookies.get("_uid") || "",
// 		},
// 	});
// };

// 現在地アップデート
export const updateUserCurrentLocation = (
	id: number,
	params: { address: string }
) =>
	client.patch(`/users/${id}`, params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

// アバターアップデート用
const imageClient = applyCaseMiddleware(
	axios.create({
		baseURL: `${process.env.REACT_APP_SERVER_URL}`,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	}),
	{
		ignoreHeaders: true,
	}
);

export const updateUserImage = (data: FormData, userId: number): AxiosPromise =>
	imageClient.patch(`/users/${userId}`, data, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
