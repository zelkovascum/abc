import {
	FC,
	memo,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";
import { postsInit, postsReducer } from "reducers/posts";
import { HomeSkeleton } from "components/atoms/posts/HomeSkeleton";
import { HomeTabs } from "components/molucules/posts/HomeTabs";
import { MapContext } from "providers/MapProvider";
import { calculateDistance } from "utils/calculateDistance";
import { Post } from "types";

export const Home: FC = memo(() => {
	const [state, dispatch] = useReducer(postsReducer, postsInit);
	const { lat, lng } = useContext(MapContext);
	const navigate = useNavigate();
	const location = useLocation();

	const onClickProfile = (id: number) => {
		navigate(`/users/${id}`);
	};

	const sortPostsByDistance = useCallback(
		(posts: Post[]) =>
			posts.sort(
				(a, b) =>
					calculateDistance(lat, lng, a.lat, a.lng) -
					calculateDistance(lat, lng, b.lat, b.lng)
			),
		[lat, lng]
	);

	const handleGetAllPosts = async () => {
		try {
			await getAllPosts().then((res) => {
				dispatch({
					type: "FETCH_SUCCESS",
					payload:
						location.pathname === "/near"
							? sortPostsByDistance([...res.data])
							: res.data,
				});
				console.log(state.fetchState);
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		console.log("start useEffect");
		dispatch({ type: "FETCHING" });
		handleGetAllPosts();
		console.log("end useEffect");
	}, [location.pathname]);

	return (
		<Box p="40px">
			<HomeTabs />
			<Grid container direction="column" wrap="nowrap" spacing={3}>
				{state.fetchState === "INITIAL" ? (
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
