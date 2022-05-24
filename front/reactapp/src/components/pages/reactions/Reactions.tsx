import { FC, memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "providers/AuthProvider";
import { getAllReactions } from "utils/api/reaction";
import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import { User } from "types";
import { ReactionButton } from "components/atoms/reactions/ReactionButton";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "providers/NotificationProvider";

export const Reactions: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const { notificationState } = useContext(NotificationContext);
	const [reactions, setReactions] = useState<User[]>([]);
	const navigate = useNavigate();

	const handleGetAllReactions = async () => {
		try {
			const res = await getAllReactions();
			setReactions(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	const onClickProfile = (id: number) => {
		navigate(`/users/${id}`);
	};

	useEffect(() => {
		handleGetAllReactions();
	}, [notificationState]);

	return (
		<Box
			sx={{
				width: {
					xs: "330px",
					sm: "450px",
				},
				p: 2,
				textAlign: "center",
			}}
		>
			<Typography>リアクション一覧</Typography>
			<List>
				{reactions!.map((reaction) => (
					<div key={reaction.id}>
						<Divider />
						<ListItem
							sx={{
								cursor: "pointer",
							}}
						>
							<ListItemAvatar onClick={() => onClickProfile(reaction.id)}>
								<Avatar src={reaction.image?.url} />
							</ListItemAvatar>
							<ListItemText
								onClick={() => onClickProfile(reaction.id)}
								primary={reaction.name}
							/>
							<ReactionButton
								fromUserId={currentUser!.id}
								toUserId={reaction.id}
							/>
						</ListItem>
					</div>
				))}
			</List>
		</Box>
	);
});
