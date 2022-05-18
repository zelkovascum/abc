import {
	FC,
	memo,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getDetailPost } from "utils/api/post";
import { transformDateTime, transformPlace } from "utils/transformForRead";
import { postInit, postReducer } from "reducers/post";
import { PostSkeleton } from "components/atoms/posts/PostSkeleton";
import { HomeTabs } from "components/molucules/posts/HomeTabs";
import { AuthContext } from "providers/AuthProvider";
import { ReactionButton } from "components/atoms/reactions/ReactionButton";
import { Post } from "types";

export const PostShow: FC = memo(() => {
	const [state, dispatch] = useReducer(postReducer, postInit);
	const [post, setPost] = useState<Post>();
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
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
				p: "40px",
			}}
		>
			{state.fetchState !== "OK" ? (
				<PostSkeleton />
			) : (
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
						m: "auto",
						borderRadius: 1,
						cursor: "pointer",
						p: 2,
					}}
				>
					<Box onClick={() => onClickProfile(state.post!.user.id)}>
						<Avatar src={state.post!.user.image?.url} />
						<Typography>{state.post!.user.name}</Typography>
					</Box>
					<Box>
						<Typography sx={{ color: "teal", fontSize: "16px" }}>
							{transformPlace(state.post!.place)}
						</Typography>
						<Typography sx={{ color: "teal", fontSize: "16px" }}>
							{transformDateTime(state.post!.dateTime.toString())}
						</Typography>
						<Typography sx={{ color: "teal", fontSize: "16px" }}>
							{state.post!.content}
						</Typography>
						<ReactionButton
							fromUserId={currentUser!.id}
							toUserId={state.post!.user.id}
						/>
					</Box>
				</Card>
			)}
		</Box>
	);
});
