import { FC, memo, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { getDetailRoom } from "utils/api/room";
import { getDetailUser } from "utils/api/user";
import { AlertMessage } from "components/molucules/AlertMessage";

export const Profile: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState({
		id: 0,
		name: "",
		email: "",
		image: "",
	});
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);
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

	const handleGetDetailRoom = async (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number
	) => {
		e.preventDefault();
		try {
			const res = await getDetailRoom(id);
			if (res.status === 200) {
				navigate(`/rooms/${res.data.id}`);
			} else if (res.status === 204) {
				setIsAlertMessageOpen(true);
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetDetailUser(id!);
	}, [id]);

	return (
		<>
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
				<Box>
					<Box sx={{ display: "flex" }}>
						<Avatar src={user.image} sx={{ verticalAlign: "middle", mr: 1 }} />
						<Typography
							sx={{ justifyContent: "center" }}
							color="teal"
							fontWeight="bold"
							fontSize="24px"
						>
							{user?.name}
						</Typography>
					</Box>
					{user?.id === currentUser?.id ? (
						<Typography textAlign="center">現在のユーザーです</Typography>
					) : (
						<Button
							// _hover={{ opacity: 0.8 }}
							// bg="teal"
							// color="white"
							onClick={(e) => handleGetDetailRoom(e, user.id)}
						>
							DM
						</Button>
					)}
				</Box>
			</Box>
			<AlertMessage
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="warning"
				message="マッチしていません"
			/>
		</>
	);
});
