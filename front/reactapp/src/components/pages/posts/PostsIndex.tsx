import { FC, memo, useEffect, useReducer } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { postsInitState, postsReducer } from "reducers/posts";
import { Post } from "types";
import { fetchPosts } from "utils/api/posts";

export const PostsIndex: FC = memo(() => {
	const [postsState, dispatch] = useReducer(postsReducer, postsInitState);

	useEffect(() => {
		dispatch({ type: "FETCHING" });
		fetchPosts().then((res) => {
			dispatch({
				type: "FETCH_SUCCESS",
				payload: res.posts,
			});
		});
	}, []);

	return (
		<>
			{postsState.fetchState === "LOADING" ? (
				<p>LOADING</p>
			) : (
				<>
					{postsState.posts.map((post: Post) => (
						<Card key={post.id} sx={{ my: 2 }}>
							<CardContent>
								<Typography>{post.place}</Typography>
								<Typography>{post.date_time}</Typography>
								<Typography>{post.content}</Typography>
							</CardContent>
						</Card>
					))}
				</>
			)}
		</>
	);
});
