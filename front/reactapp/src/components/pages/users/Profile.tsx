import { Box } from "@mui/material";
import { CardSkeleton } from "components/atoms/CardSkeleton";
import { FC, memo, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userReducer, userInit } from "reducers/user";
import { getDetailUser } from "utils/api/user";
import { UserCard } from "../../organisms/users/UserCard";

export const Profile: FC = memo(() => {
	const [state, dispatch] = useReducer(userReducer, userInit);
	const navigate = useNavigate();
	const { id } = useParams();

	const handleGetDetailUser = async (id: string) => {
		try {
			await getDetailUser(id).then((res) => {
				console.log(res.data.userInfo);
				dispatch({
					type: "FETCH_SUCCESS",
					userPayload: res.data.userInfo,
					roomPayload: res.data.roomId,
				});
			});
		} catch (e) {
			console.error(e);
		}
	};

	const handleGetDetailRoom = () => {
		navigate(`/rooms/${state.roomId}`);
	};

	useEffect(() => {
		handleGetDetailUser(id!);
	}, [id]);

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
					<CardSkeleton />
				) : (
					<UserCard
						imageUrl={state.user!.image.url}
						name={state.user!.name}
						handleGetDetailRoom={() => handleGetDetailRoom()}
						roomId={state.roomId!}
					/>
				)}
			</Box>
		</>
	);
});
