import { FC, memo, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { createRoom } from "utils/api/room";
import { getDetailUser } from "utils/api/user";

export const Profile: FC = memo(() => {
	const { currentUser } = useContext<any>(AuthContext);

	const navigate = useNavigate();
	const [user, setUser] = useState({
		id: 0,
		name: "",
		email: "",
	});

	const query = useParams();

	const handleGetDetailUser = async (query: any) => {
		try {
			const res = await getDetailUser(query.id);
			console.log(res.data);
			setUser({
				id: res.data.id,
				name: res.data.name,
				email: res.data.email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	// ルーム機能API
	const handleCreateRoom = async (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number
	) => {
		e.preventDefault();
		try {
			const res = await createRoom(id);
			console.log(res);
			// navigate(`/room/${res.data.id}`);
			navigate(`/rooms/${res.data.id}`);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		handleGetDetailUser(query);
	}, [query]);
	return (
		<Box width="100%" height="100%" p="40px">
			<Typography sx={{ as: "h1", textAlign: "center" }} mb={4}>
				プロフィール
			</Typography>
			<Box
				sx={{
					width: "240px",
					height: "240px",
					bg: "white",
					mx: "auto",
					borderRadius: "md",
					shadow: "md",
					p: "16px",
				}}
			>
				<Stack width="100%">
					<Typography
						textAlign="center"
						color="teal"
						fontWeight="bold"
						fontSize="24px"
					>
						{user?.name}
					</Typography>
					<Typography textAlign="center">{user?.email}</Typography>
					{user?.id === currentUser.id ? (
						<Typography textAlign="center">現在のユーザーです</Typography>
					) : (
						<>
							<Button
								// _hover={{ opacity: 0.8 }}
								// bg="teal"
								// color="white"
								onClick={(e) => handleCreateRoom(e, user.id)}
							>
								DM
							</Button>
						</>
					)}
				</Stack>
			</Box>
			<Divider sx={{ my: "16px" }} />
		</Box>
	);
});
