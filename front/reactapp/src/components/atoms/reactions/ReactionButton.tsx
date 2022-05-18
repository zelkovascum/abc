import { FC, memo, MouseEvent } from "react";
import { Button } from "@mui/material";
import { Reaction } from "types";
import { createReaction } from "utils/api/reaction";

export const ReactionButton: FC<Reaction> = memo((props) => {
	const { fromUserId, toUserId } = props;

	const onClickReaction = async (
		e: MouseEvent<HTMLButtonElement>,
		fromUserId: number,
		toUserId: number
	) => {
		e.preventDefault();
		try {
			await createReaction({
				fromUserId,
				toUserId,
			});
			console.log("create reaction!");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Button onClick={(e) => onClickReaction(e, fromUserId, toUserId)}>
			リアクション
		</Button>
	);
});
