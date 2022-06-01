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
} from "@mui/material";

type Props = {
	imageUrl?: string;
	name: string;
	handleGetDetailRoom: () => void;
	roomId: number;
};

export const UserCard: FC<Props> = memo((props) => {
	const { imageUrl, name, handleGetDetailRoom, roomId } = props;

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
					SNS:
				</Grid>
				<Grid item xs={10} sm={10.5}>
					<Typography sx={{ fontSize: "16px" }}>twitter</Typography>
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
};
