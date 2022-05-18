import { FC, memo, MouseEvent, useState } from "react";
import { Button } from "@mui/material";
import { createReaction } from "utils/api/reaction";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "components/molucules/AlertMessage";

type Props = {
	fromUserId: number;
	toUserId: number;
};

export const ReactionButton: FC<Props> = memo((props) => {
	const { fromUserId, toUserId } = props;
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
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
			console.log(res.data);
			setMessage(res.data.message);
			setIsAlertMessageOpen(true);
			// if (res.data === "") return;
			// navigate(`/rooms/${res.data.id}`);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Button onClick={(e) => onClickReaction(e, fromUserId, toUserId)}>
				リアクション
			</Button>
			<AlertMessage
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="info"
				message={message}
			/>
		</>
	);
});
