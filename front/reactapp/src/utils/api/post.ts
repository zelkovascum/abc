import Cookies from "js-cookie";
import { Post } from "types";
import { client } from "./client";

export const getAllPosts = () =>
	client.get("/posts", {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

export const getDetailPost = (id: number) => {
	return client.get(`/posts/${id}`);
};

export const createPost = (
	params: Pick<Post, "lat" | "lng" | "place" | "dateTime" | "content">
) =>
	client.post("/posts", params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});

// export const updatePost = (
// 	id: number,
// 	params: Pick<Post, "lat" | "lng" | "place" | "date_time" | "content">
// ) => {
// 	return client.patch(`/posts/${id}`, params, {
// 		headers: {
// 			"access-token": Cookies.get("_access_token") || "",
// 			client: Cookies.get("_client") || "",
// 			uid: Cookies.get("_uid") || "",
// 		},
// 	});
// };

export const deletePost = (id: number) =>
	client.delete(`/posts/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
