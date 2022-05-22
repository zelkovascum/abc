import { FC, memo, MouseEvent, useRef, useState } from "react";
import { Button } from "@mui/material";
import { AlertMessage } from "components/molucules/AlertMessage";
import { deletePost } from "utils/api/post";

type Props = {
	postId: number;
};

export const PostDeleteButton: FC<Props> = memo((props) => {
	const { postId } = props;
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);
	const processing = useRef(false);

	const onClickDelete = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (processing.current) return;
		processing.current = true;
		try {
			await deletePost(postId);
			setIsAlertMessageOpen(true);
			window.location.reload();
			processing.current = false;
		} catch (e) {
			console.error(e);
			processing.current = false;
		}
	};

	return (
		<>
			<Button onClick={(e) => onClickDelete(e)}>削除</Button>
			<AlertMessage
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="success"
				message="削除しました"
			/>
		</>
	);
});
