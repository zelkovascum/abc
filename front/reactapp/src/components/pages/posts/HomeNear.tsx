import { FC, memo, useContext, useEffect, useReducer } from "react";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";
import { postsInit, postsReducer } from "reducers/posts";
import { HomeSkeleton } from "components/atoms/posts/HomeSkeleton";
import { HomeTabs } from "components/molucules/posts/HomeTabs";
import { calculateDistance } from "utils/calculateDistance";
import { MapContext } from "providers/MapProvider";
import { AuthContext } from "providers/AuthProvider";
import { Post } from "types";

export const HomeNear: FC = memo(() => {
	const [state, dispatch] = useReducer(postsReducer, postsInit);
	const { lat, lng } = useContext(MapContext);
	// const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	// const location = useLocation();

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

	const sort = (posts: Post[]) => {
		return posts.sort((a, b) => {
			const distanceA = calculateDistance(lat, lng, a.lat, a.lng);
			const distanceB = calculateDistance(lat, lng, b.lat, b.lng);
			console.log(distanceA - distanceB);
			return distanceA - distanceB;
		});
	};

	useEffect(() => {
		dispatch({ type: "FETCHING" });
		handleGetAllPosts();
	}, []);

	return (
		<Box p="40px">
			<HomeTabs />
			<Grid container direction="column" wrap="nowrap" spacing={3}>
				{state.fetchState === "LOADING" ? (
					<>
						<HomeSkeleton />
						<HomeSkeleton />
						<HomeSkeleton />
					</>
				) : (
					<>
						{sort([...state.posts]).map((post) => (
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
