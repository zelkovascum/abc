const DEFAULT_API_LOCALHOST = "http://localhost:3000/api/v1";

// GET
export const postsIndex = `${DEFAULT_API_LOCALHOST}/posts`;
// POST
export const postsCreate = `${DEFAULT_API_LOCALHOST}/posts`;
// GET
export const postsShow = (postId: number) =>
	`${DEFAULT_API_LOCALHOST}/posts/${postId}`;
// PATCH
// export const postsUpdate = (postId: number) =>
// 	`${DEFAULT_API_LOCALHOST}/posts/${postId}`;
// DELETE
export const postsDestroy = (postId: number) =>
	`${DEFAULT_API_LOCALHOST}/posts/${postId}`;
