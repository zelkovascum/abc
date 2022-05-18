import { FC, memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "providers/AuthProvider";
import { getAllReactions } from "utils/api/reaction";
import { Box, Card, Typography } from "@mui/material";
import { User } from "types";
import { ReactionButton } from "components/atoms/reactions/ReactionButton";

export const Reactions: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [reactions, setReactions] = useState<User[]>([]);

	const handleGetAllReactions = async () => {
		try {
			const res = await getAllReactions();
			setReactions(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetAllReactions();
	}, []);

	return (
		<>
			<Box>
				<Typography>リアクション一覧</Typography>
				{reactions!.map((reaction) => (
					<Card key={reaction.id}>
						<Typography>{reaction.name}</Typography>
						<ReactionButton
							fromUserId={currentUser!.id}
							toUserId={reaction.id}
						/>
					</Card>
				))}
			</Box>
		</>
	);
});
