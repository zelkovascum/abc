import { FC, memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "providers/AuthProvider";
import { getAllReactions } from "utils/api/reaction";
import { Box, Card, Typography } from "@mui/material";
import { Reaction } from "types";

export const Reactions: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const [reactions, setReactions] = useState<Reaction[]>([]);

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
				{reactions!.map((reaction) => (
					<Card key={reaction.fromUserId}>
						<Typography>{reaction.fromUserId}</Typography>
					</Card>
				))}
			</Box>
		</>
	);
});
