import { FC, memo, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { createRoom } from "utils/api/room";
import { getDetailUser } from "utils/api/user";

export const Profile: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState({
		id: 0,
		name: "",
		email: "",
		image: "",
	});
	const navigate = useNavigate();
	const { id } = useParams();

	const handleGetDetailUser = async (id: string) => {
		try {
			const res = await getDetailUser(id);
			setUser({
				id: res.data.id,
				name: res.data.name,
				email: res.data.email,
				image: res.data.image.url,
			});
		} catch (e) {
			console.error(e);
		}
	};

	const handleCreateRoom = async (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number
	) => {
		e.preventDefault();
		try {
			const res = await createRoom(id);
			// navigate(`/room/${res.data.id}`);
			navigate(`/rooms/${res.data.id}`);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetDetailUser(id!);
	}, [id]);

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
					<Avatar src={user.image} />
					<Typography
						textAlign="center"
						color="teal"
						fontWeight="bold"
						fontSize="24px"
					>
						{user?.name}
					</Typography>
					{user?.id === currentUser?.id ? (
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
