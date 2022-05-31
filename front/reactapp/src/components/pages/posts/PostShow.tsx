import { FC, memo, useContext, useEffect, useReducer } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailPost } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";
import { postInit, postReducer } from "reducers/post";
import { PostSkeleton } from "components/atoms/posts/PostSkeleton";
import { AuthContext } from "providers/AuthProvider";
import { PostCard } from "components/organisms/posts/PostCard";

export const PostShow: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [state, dispatch] = useReducer(postReducer, postInit);
	const navigate = useNavigate();
	const { id } = useParams();

	const onClickProfile = (id: number) => {
		navigate(`/users/${id}`);
	};

	const handleGetDetailPost = async () => {
		try {
			await getDetailPost(parseInt(id!)).then((res) => {
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
		handleGetDetailPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Box
				sx={{
					width: {
						xs: "300px",
						sm: "400px",
						md: "500px",
						lg: "600px",
						xl: "650px",
					},
					p: "40px",
				}}
			>
				{state.fetchState !== "OK" ? (
					<PostSkeleton />
				) : (
					<PostCard
						userId={state.post!.user.id}
						imageUrl={state.post!.user.image?.url}
						name={state.post!.user.name}
						place={transformPlace(state.post!.place)}
						dateTime={transformDateTime(state.post!.dateTime.toString())}
						content={state.post!.content}
						currentUserId={currentUser!.id}
						onClickProfile={() => onClickProfile(state.post!.user.id)}
						onClickPost={() => {}}
						reactionOrDeleteButton="reaction"
					/>
				)}
			</Box>
		</>
	);
});
