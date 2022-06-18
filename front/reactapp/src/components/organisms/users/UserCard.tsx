import { FC, memo } from "react";
import {
	Avatar,
	Card,
	Typography,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Grid,
	Button,
	Link,
} from "@mui/material";

type Props = {
	imageUrl?: string;
	name: string;
	snsLink?: string;
	handleGetDetailRoom: () => void;
	roomId: number;
};

export const UserCard: FC<Props> = memo((props) => {
	const { imageUrl, name, snsLink, handleGetDetailRoom, roomId } = props;

	return (
		<Card sx={CardStyle}>
			<ListItem sx={{ pl: 0.5 }}>
				<ListItemAvatar>
					<Avatar src={imageUrl} />
				</ListItemAvatar>
				<ListItemText
					primary={<Typography sx={{ color: "teal" }}>{name}</Typography>}
				/>
			</ListItem>
			<Grid container>
				<Grid item xs={2} sm={1.5}>
					<Typography>SNS:</Typography>
				</Grid>
				<Grid item xs={10} sm={10.5}>
					{snsLink ? <Link href={snsLink}>{snsLink}</Link> : "未設定"}
				</Grid>
			</Grid>
			{roomId !== 0 ? (
				<Button onClick={() => handleGetDetailRoom()}>メッセージ</Button>
			) : (
				<Typography>マッチしていないユーザーです</Typography>
			)}
		</Card>
	);
});

export const CardStyle = {
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
