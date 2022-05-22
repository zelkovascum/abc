import { FC, memo, MouseEvent, useState } from "react";
import { Button } from "@mui/material";
import { AlertMessage } from "components/molucules/AlertMessage";
import { deletePost } from "utils/api/post";

type Props = {
	postId: number;
};

export const PostDeleteButton: FC<Props> = memo((props) => {
	const { postId } = props;
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);

	const onClickDelete = async (
		e: MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		try {
			await deletePost(postId);
			setIsAlertMessageOpen(true);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Button onClick={(e) => onClickDelete(e)}>
				削除
			</Button>
			<AlertMessage
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="success"
				message="削除しました"
			/>
		</>
	);
});
