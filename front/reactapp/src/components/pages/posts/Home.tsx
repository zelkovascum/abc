import { FC, memo, useEffect, useReducer } from "react";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";
import { postsInit, postsReducer } from "reducers/posts";
import { HomeSkeleton } from "components/molucules/posts/HomeSkeleton";

export const Home: FC = memo(() => {
	const [state, dispatch] = useReducer(postsReducer, postsInit);
	const navigate = useNavigate();

	const onClickProfile = (id: number) => {
		navigate(`/users/${id}`);
	};

	const handleGetAllPosts = async () => {
		try {
			await getAllPosts().then((res) => {
				dispatch({
					type: "FETCH_SUCCESS",
					payload: res.data,
				});
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		dispatch({ type: "FETCHING" });
		handleGetAllPosts();
	}, []);

	return (
		<Box p="40px">
			<Grid container direction="column" wrap="nowrap" spacing={3}>
				{state.fetchState === "LOADING" ? (
					<>
						<HomeSkeleton />
						<HomeSkeleton />
						<HomeSkeleton />
					</>
				) : (
					<>
						{state.posts.map((post) => (
							<Grid item key={post.id}>
								<Card
									sx={{
										width: {
											xs: "250px",
											sm: "350px",
											md: "450px",
											lg: "550px",
											xl: "600px",
										},
										height: "220px",
										borderRadius: 1,
										cursor: "pointer",
										p: 2,
									}}
								>
									<Box onClick={() => onClickProfile(post.user.id)}>
										<Avatar src={post.user.image?.url} />
										<Typography>{post.user.name}</Typography>
									</Box>
									<Box>
										<Typography sx={{ color: "teal", fontSize: "16px" }}>
											{transformPlace(post.place)}
										</Typography>
										<Typography sx={{ color: "teal", fontSize: "16px" }}>
											{transformDateTime(post.dateTime.toString())}
										</Typography>
										<Typography sx={{ color: "teal", fontSize: "16px" }}>
											{post.content}
										</Typography>
									</Box>
								</Card>
							</Grid>
						))}
					</>
				)}
			</Grid>
		</Box>
	);
});

// export const Home: FC = memo(() => {
// 	const [posts, setPosts] = useState<OutputPost[]>([]);
// 	const navigate = useNavigate();

// 	const onClickProfile = (id: number) => {
// 		navigate(`/users/${id}`);
// 	};

// 	const handleGetAllPosts = async () => {
// 		try {
// 			const res = await getAllPosts();
// 			setPosts(res.data);
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	};

// 	useEffect(() => {
// 		handleGetAllPosts();
// 	}, []);

// 	return (
// 		<Box p="40px">
// 			<Grid container direction="column" wrap="nowrap" spacing={3}>
// 				{posts.map((post) => (
// 					<Grid item key={post.id}>
// 						<Card
// 							sx={{
// 								height: "220px",
// 								bg: "white",
// 								borderRadius: "md",
// 								shadow: "md",
// 								cursor: "pointer",
// 								p: 2,
// 							}}
// 						>
// 							<Box onClick={() => onClickProfile(post.user.id)}>
// 								<Avatar src={post.user.image?.url} />
// 								<Typography>{post.user.name}</Typography>
// 							</Box>
// 							<Box
// 							>
// 								<Typography sx={{ color: "teal", fontSize: "16px" }}>
// 									{transformPlace(post.place)}
// 								</Typography>
// 								<Typography sx={{ color: "teal", fontSize: "16px" }}>
// 									{transformDateTime(post.dateTime)}
// 								</Typography>
// 								<Typography sx={{ color: "teal", fontSize: "16px" }}>
// 									{post.content}
// 								</Typography>
// 							</Box>
// 						</Card>
// 					</Grid>
// 				))}
// 			</Grid>
// 		</Box>
// 	);
// });
