import Cookies from "js-cookie";
import { AxiosPromise } from "axios";
import { client } from "./client";

type Params = {
	address?: string;
	sns?: string;
};

export const getDetailUser = (id: string) =>
	client.get(`/users/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

export const updateUser = (id: number, params: Params) =>
	client.patch(`/users/${id}`, params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

// アバターアップデート用
export const updateUserImage = (data: FormData, userId: number): AxiosPromise =>
	client.patch(`/users/${userId}`, data, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
