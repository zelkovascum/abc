import { FC, memo } from "react";
import {
	Avatar,
	Card,
	Typography,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Grid,
	Divider,
} from "@mui/material";
import { ReactionButton } from "components/atoms/reactions/ReactionButton";
import { PostDeleteButton } from "components/atoms/posts/PostDeleteButton";

type Props = {
	postId?: number;
	userId: number;
	imageUrl?: string;
	name: string;
	place: string;
	dateTime: string;
	content: string;
	currentUserId: number;
	onClickProfile: () => void;
	onClickPost: () => void;
	postCardType: "home" | "detail" | "myPost";
};

export const PostCard: FC<Props> = memo((props) => {
	const {
		postId,
		userId,
		imageUrl,
		name,
		place,
		dateTime,
		content,
		currentUserId,
		onClickProfile,
		onClickPost,
		postCardType,
	} = props;

	return (
		<Card sx={PostCardStyle}>
			<ListItem
				onClick={() => onClickProfile()}
				sx={{
					cursor: postCardType === "myPost" ? "default" : "pointer",
					pl: 0.5,
				}}
			>
				<ListItemAvatar>
					<Avatar src={imageUrl} />
				</ListItemAvatar>
				<ListItemText
					primary={<Typography sx={{ color: "teal" }}>{name}</Typography>}
				/>
				{postCardType === "detail" ? (
					<ReactionButton fromUserId={currentUserId} toUserId={userId} />
				) : postCardType === "myPost" ? (
					<PostDeleteButton postId={postId!} />
				) : (
					<></>
				)}
			</ListItem>
			<Divider sx={{ my: 1 }} />
			<Grid
				container
				onClick={() => onClickPost()}
				sx={{
					cursor: postCardType === "home" ? "pointer" : "default",
				}}
			>
				<Grid item xs={2} sm={1.5}>
					場所:
				</Grid>
				<Grid item xs={10} sm={10.5}>
					<Typography sx={{ fontSize: "16px" }}>{place}</Typography>
				</Grid>
				<Grid item xs={2} sm={1.5}>
					日時:
				</Grid>
				<Grid item xs={10} sm={10.5}>
					<Typography sx={{ fontSize: "16px" }}>{dateTime}</Typography>
				</Grid>
				<Grid item sx={{ mt: 1 }}>
					<Typography sx={{ fontSize: "16px" }}>{content}</Typography>
				</Grid>
			</Grid>
		</Card>
	);
});

export const PostCardStyle = {
	width: {
		xs: "250px",
		sm: "350px",
		md: "450px",
		lg: "550px",
		xl: "600px",
	},
	minHeight: "180px",
	m: "auto",
	borderRadius: 1,
	px: 2,
	py: 0.5,
	boxShadow: " 0 0 3px 0 rgba(0,0,0,.1), 0 2px 3px 0 rgba(0,0,0,.2)",
	transition: ".3s",
	"&:hover": {
		boxShadow: "0 15px 30px -5px rgba(0,0,0,.15), 0 0 5px rgba(0,0,0,.1)",
		transform: "translateY(-3px)",
	},
};
