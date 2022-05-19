import {
	FC,
	memo,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Box,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
} from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { getAllRooms } from "utils/api/room";
import { roomsInit, roomsReducer } from "reducers/rooms";
import { RoomSkeleton } from "components/atoms/posts/RoomSkeleton";

export const Rooms: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [state, dispatch] = useReducer(roomsReducer, roomsInit);
	const navigate = useNavigate();

	const handleGetAllRooms = async () => {
		try {
			await getAllRooms().then((res) => {
				dispatch({
					type: "FETCH_SUCCESS",
					payload: res.data,
				});
			});
		} catch (e) {
			console.error(e);
		}
	};

	const onClickDetailRoom = useCallback(
		(id: number) => {
			navigate(`/rooms/${id}`);
		},
		[navigate]
	);

	useEffect(() => {
		dispatch({ type: "FETCHING" });
		handleGetAllRooms();
	}, []);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: {
					xs: "300px",
					sm: "400px",
					md: "500px",
					lg: "600px",
					xl: "700px",
				},
			}}
		>
			<Typography sx={{ as: "h1", m: "auto", my: 2, textAlign: "center" }}>
				メッセージ
			</Typography>
			<List sx={{ textAlign: "center" }}>
				{state.fetchState !== "OK" ? (
					<>
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
						<RoomSkeleton />
					</>
				) : (
					<>
						{state.rooms
							.sort((a, b) => b.lastMessage?.id - a.lastMessage?.id)
							.map((room) => (
								<>
									<Divider />
									<ListItem
										key={room.id}
										onClick={() => onClickDetailRoom(room.id)}
										sx={{
											cursor: "pointer",
											mx: "auto",
										}}
										button
									>
										<>
											<ListItemAvatar>
												<Avatar src={room.otherUser.image?.url} />
											</ListItemAvatar>
											<ListItemText
												primary={room.otherUser.name}
												secondary={
													room.lastMessage === null
														? "まだメッセージがありません"
														: `${
																room.lastMessage.userId === currentUser!.id
																	? `あなた:${room.lastMessage.content}`
																	: `${room.otherUser.name}:${room.lastMessage.content}`
														  }`
												}
												sx={{
													width: {
														xs: "200px",
														sm: "300px",
														md: "400px",
														lg: "500px",
														xl: "600px",
													},
												}}
											/>
										</>
									</ListItem>
								</>
							))}
					</>
				)}
			</List>
		</Box>
	);
});

// import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
// 	Avatar,
// 	Box,
// 	Typography,
// 	List,
// 	ListItem,
// 	ListItemAvatar,
// 	ListItemText,
// } from "@mui/material";
// import { AuthContext } from "providers/AuthProvider";
// import { Room } from "types";
// import { getAllRooms } from "utils/api/room";

// export const Rooms: FC = memo(() => {
// 	const { currentUser } = useContext(AuthContext);
// 	const [rooms, setRooms] = useState<Room[]>();
// 	const navigate = useNavigate();

// 	const handleGetAllRooms = async () => {
// 		try {
// 			const res = await getAllRooms();
// 			setRooms(res.data);
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	};

// 	const onClickDetailRoom = useCallback(
// 		(id: number) => {
// 			navigate(`/rooms/${id}`);
// 		},
// 		[navigate]
// 	);

// 	useEffect(() => {
// 		handleGetAllRooms();
// 	}, []);

// 	return (
// 		<Box>
// 			<Typography sx={{ as: "h1", textAlign: "center" }} my={2}>
// 				メッセージ
// 			</Typography>
// 			<List>
// 				{rooms
// 					?.sort((a, b) => b.lastMessage?.id - a.lastMessage?.id)
// 					.map((room) => (
// 						<ListItem
// 							key={room.id}
// 							onClick={() => onClickDetailRoom(room.id)}
// 							sx={{ cursor: "pointer", mb: 1 }}
// 						>
// 							<ListItemAvatar>
// 								<Avatar src={room.otherUser.image?.url} />
// 							</ListItemAvatar>
// 							<ListItemText
// 								primary={room.otherUser.name}
// 								secondary={
// 									room.lastMessage === null
// 										? "まだメッセージがありません"
// 										: `${
// 												room.lastMessage.userId === currentUser!.id
// 													? `あなた:${room.lastMessage.content}`
// 													: `${room.otherUser.name}:${room.lastMessage.content}`
// 										  }`
// 								}
// 							/>
// 						</ListItem>
// 					))}
// 			</List>
// 		</Box>
// 	);
// });
