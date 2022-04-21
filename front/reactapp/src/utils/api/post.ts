import Cookies from "js-cookie";
import { Post } from "types";
import { client } from "./client";

// export const fetchPosts = () => {
// 	return axios
// 		.get(postsIndex)
// 		.then((res) => {
// 			return res.data;
// 		})
// 		.catch((e) => console.error(e));
// };

// type Params = {
// 	lat: number;
// 	lng: number;
// 	place: string;
// 	dateTime: any; //要修正
// 	content: string;
// };

// export const postPosts = (params: Params) => {
// 	const { lat, lng, place, dateTime, content } = params;

// 	return axios
// 		.post(postsCreate, {
// 			lat: lat,
// 			lng: lng,
// 			place: place,
// 			date_time: dateTime,
// 			content: content,
// 		})
// 		.then((res) => {
// 			console.log("functionOK");
// 			return res.data;
// 		})
// 		.catch((e) =>
// 			// console.error(e)
// 			console.log("funcError")
// 		);
// };

// 参考↓
export const getAllPosts = () => {
	return client.get("/posts");
};

// export const getDetailPost = (id: number) => {
// 	return client.get(`/posts/${id}`);
// };

export const createPost = (
	params: Pick<Post, "lat" | "lng" | "place" | "dateTime" | "content">
) => {
	return client.post("/posts", params, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};

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

export const deletePost = (id: number) => {
	return client.delete(`/posts/${id}`, {
		headers: {
			"access-token": Cookies.get("_access_token") || "",
			client: Cookies.get("_client") || "",
			uid: Cookies.get("_uid") || "",
		},
	});
};
