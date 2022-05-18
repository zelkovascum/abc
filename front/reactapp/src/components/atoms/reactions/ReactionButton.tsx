import { FC, memo, MouseEvent } from "react";
import { Button } from "@mui/material";
import { Reaction } from "types";
import { createReaction } from "utils/api/reaction";
import { useNavigate } from "react-router-dom";

export const ReactionButton: FC<Reaction> = memo((props) => {
	const { fromUserId, toUserId } = props;
	const navigate = useNavigate();

	const onClickReaction = async (
		e: MouseEvent<HTMLButtonElement>,
		fromUserId: number,
		toUserId: number
	) => {
		e.preventDefault();
		try {
			const res = await createReaction({
				fromUserId,
				toUserId,
			});
			if (res.data === "") return;
			navigate(`/rooms/${res.data.id}`);
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
