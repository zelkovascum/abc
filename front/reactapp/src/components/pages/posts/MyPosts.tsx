import { FC, memo, useContext, useEffect, useReducer } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getAllPosts } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";
import { postsInit, postsReducer } from "reducers/posts";
import { CardSkeleton } from "components/atoms/posts/CardSkeleton";
import { AuthContext } from "providers/AuthProvider";
import { PostCard } from "components/organisms/posts/PostCard";

export const MyPosts: FC = memo(() => {
	const [state, dispatch] = useReducer(postsReducer, postsInit);
	const { currentUser } = useContext(AuthContext);

	const handleGetAllPosts = async () => {
		try {
			await getAllPosts(true).then((res) => {
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
		<Box
			sx={{
				width: {
					xs: "300px",
					sm: "400px",
					md: "500px",
					lg: "600px",
					xl: "650px",
				},
				p: 1,
			}}
		>
			<Typography sx={{ textAlign: "center", m: 1 }}>
				投稿した募集一覧
			</Typography>
			<Grid container direction="column" wrap="nowrap" spacing={3}>
				{state.fetchState !== "OK" ? (
					<>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</>
				) : (
					<>
						{state.posts.map((post) => (
							<Grid item key={post.id}>
								<PostCard
									postId={post.id}
									userId={post.user.id}
									imageUrl={post.user.image?.url}
									name={post.user.name}
									place={transformPlace(post.place)}
									dateTime={transformDateTime(post.dateTime.toString())}
									content={post.content}
									currentUserId={currentUser!.id}
									onClickProfile={() => {}}
									onClickPost={() => {}}
									postCardType="myPost"
								/>
							</Grid>
						))}
					</>
				)}
			</Grid>
		</Box>
	);
});
