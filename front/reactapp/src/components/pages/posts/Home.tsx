import {
	FC,
	memo,
	// useCallback,
	// useContext,
	useEffect,
	// useReducer,
	useState,
} from "react";
import { Box, Grid, Typography } from "@mui/material";
// import { postsInitState, postsReducer } from "reducers/posts";
import { Post } from "types";
// import { fetchPosts } from "utils/api/posts";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "utils/api/post";

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
	const [posts, setPosts] = useState<Post[]>([]);

	const navigate = useNavigate();

	// const onClickDetailPost = useCallback(
	//   (id) => {
	//     navigate(`/post/${id}`);
	//   },
	//   [navigate]
	// );

	const onClickProfile = (id: number) => {
		navigate(`/user/${id}`);
	};

	const handleGetAllPosts = async () => {
		try {
			const res = await getAllPosts();
			console.log(res.data);
			setPosts(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		handleGetAllPosts();
	}, []);
  
	return (
		<Box p="40px">
			<Typography sx={{ as: "h1", textAlign: "center", mb: "16px" }}>
				投稿一覧ページ
			</Typography>
			<Grid>
				{posts.map((post) => (
					<Grid item key={post.id}>
						<Box
							sx={{
								width: "180px",
								height: "180px",
								bg: "white",
								borderRadius: "md",
								shadow: "md",
								cursor: "pointer",
							}}
						>
							<Box textAlign="center">
								<Typography
									// onClick={() => onClickDetailPost(post.id)}
									sx={{ color: "teal", fontWeight: "bold", fontSize: "24px" }}
								>
									{post.content}
								</Typography>
								<Box onClick={() => onClickProfile(post.user.id)}>
									<Typography>{post.user.name}</Typography>
									<Typography>{post.user.email}</Typography>
								</Box>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
});
