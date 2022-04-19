import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { Room } from "types";
import { getAllRooms } from "utils/api/room";

export const Rooms: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [rooms, setRooms] = useState<Room[]>();
	const navigate = useNavigate();

	const onClickDetailRoom = useCallback(
		(id: number) => {
			navigate(`/room/${id}`);
		},
		[navigate]
	);

	// ルーム一覧API
	const handleGetAllRooms = async () => {
		try {
			const res = await getAllRooms();
			setRooms(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	// 最後のメッセージが新しいルーム順
	rooms?.sort((a, b) => b.lastMessage?.id - a.lastMessage?.id);

	useEffect(() => {
		handleGetAllRooms();
	}, []);

	return (
		<Box width="100%" height="100%" p="40px">
			<Typography sx={{ as: "h1", textAlign: "center" }} mb={4}>
				DM一覧
			</Typography>
			<Grid>
				{rooms?.map((room) => (
					<Grid item key={room.id}>
						<Box
							sx={{
								width: "240px",
								height: "240px",
								bg: "white",
								borderRadius: "md",
								shadow: "md",
								cursor: "pointer",
								p: "16px",
							}}
							onClick={() => onClickDetailRoom(room.id)}
						>
							<Box textAlign="center">
								<Typography
									sx={{ fontWeight: "bold", fontSize: "24px", color: "teal" }}
								>
									{room.otherUser.name}
								</Typography>
								<Typography>
									{room.lastMessage === null
										? "まだメッセージがありません"
										: `${
												room.lastMessage.userId === currentUser!.id
													? `自分：${room.lastMessage.content}`
													: `${room.otherUser.name}:${room.lastMessage.content}`
										  }`}
								</Typography>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
});
