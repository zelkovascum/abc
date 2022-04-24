import { FC, memo, useEffect, useState } from "react";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { OutputPost } from "types";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";

// export const PostsIndex: FC = memo(() => {
// 	const [postsState, dispatch] = useReducer(postsReducer, postsInitState);

// 	useEffect(() => {
// 		dispatch({ type: "FETCHING" });
// 		fetchPosts().then((res) => {
// 			dispatch({
// 				type: "FETCH_SUCCESS",
// 				payload: res.posts,
// 			});
// 		});
// 	}, []);

// 	return (
// 		<>
// 			{postsState.fetchState === "LOADING" ? (
// 				<p>LOADING</p>
// 			) : (
// 				<>
// 					{postsState.posts.map((post: Post) => (
// 						<Card key={post.id} sx={{ my: 2 }}>
// 							<CardContent>
// 								<Typography>{post.place}</Typography>
// 								<Typography>{post.date_time}</Typography>
// 								<Typography>{post.content}</Typography>
// 							</CardContent>
// 						</Card>
// 					))}
// 				</>
// 			)}
// 		</>
// 	);
// });

export const Home: FC = memo(() => {
	const [posts, setPosts] = useState<OutputPost[]>([]);

	const navigate = useNavigate();

	// const onClickDetailPost = useCallback(
	//   (id) => {
	//     navigate(`/post/${id}`);
	//   },
	//   [navigate]
	// );

	const onClickProfile = (id: number) => {
		navigate(`/users/${id}`);
	};

	const handleGetAllPosts = async () => {
		try {
			const res = await getAllPosts();
			setPosts(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetAllPosts();
	}, []);

	return (
		<Box p="40px">
			{/* <Typography sx={{ as: "h1", textAlign: "center", mb: "16px" }}>
				投稿一覧ページ
			</Typography> */}
			<Grid container direction="column" wrap="nowrap" spacing={3}>
				{posts.map((post) => (
					<Grid item key={post.id}>
						<Card
							sx={{
								height: "220px",
								bg: "white",
								borderRadius: "md",
								shadow: "md",
								cursor: "pointer",
								p: 2,
							}}
						>
							<Box onClick={() => onClickProfile(post.user.id)}>
								<Avatar src={post.user.image?.url} />
								<Typography>{post.user.name}</Typography>
							</Box>
							<Box
							//  onClick={() => onClickDetailPost(post.id)}
							>
								<Typography sx={{ color: "teal", fontSize: "16px" }}>
									{transformPlace(post.place)}
								</Typography>
								<Typography sx={{ color: "teal", fontSize: "16px" }}>
									{transformDateTime(post.dateTime)}
								</Typography>
								<Typography sx={{ color: "teal", fontSize: "16px" }}>
									{post.content}
								</Typography>
							</Box>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
});
