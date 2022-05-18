import { FC, memo } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { ReactionButton } from "components/atoms/reactions/ReactionButton";

type Props = {
	userId: number;
	imageUrl?: string;
	name: string;
	place: string;
	dateTime: string;
	content: string;
	currentUserId: number;
	onClickProfile: () => void;
	onClickPost: () => void;
};

export const PostCard: FC<Props> = memo((props) => {
	const {
		userId,
		imageUrl,
		name,
		place,
		dateTime,
		content,
		currentUserId,
		onClickProfile,
		onClickPost,
	} = props;

	return (
		<Card
			sx={{
				width: {
					xs: "250px",
					sm: "350px",
					md: "450px",
					lg: "550px",
					xl: "600px",
				},
				height: "220px",
				m: "auto",
				borderRadius: 1,
				cursor: "pointer",
				p: 2,
			}}
		>
			<Box onClick={() => onClickProfile()}>
				<Avatar src={imageUrl} />
				<Typography>{name}</Typography>
			</Box>
			<Box onClick={() => onClickPost()}>
				<Typography sx={{ color: "teal", fontSize: "16px" }}>
					{place}
				</Typography>
				<Typography sx={{ color: "teal", fontSize: "16px" }}>
					{dateTime}
				</Typography>
				<Typography sx={{ color: "teal", fontSize: "16px" }}>
					{content}
				</Typography>
				<ReactionButton fromUserId={currentUserId} toUserId={userId} />
			</Box>
		</Card>
	);
});
