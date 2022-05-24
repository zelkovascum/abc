import { FC, memo, useState, useEffect, MouseEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { User } from "types";
import { getAllReactions } from "utils/api/reaction";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { NotificationContext } from "providers/NotificationProvider";

export const Header: FC = memo(() => {
	const { currentUser } = useContext(AuthContext);
	const { notificationState } = useContext(NotificationContext);
	const [reactions, setReactions] = useState<User[]>([]);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleGetAllReactions = async () => {
		try {
			const res = await getAllReactions();
			setReactions(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	const handleAccountMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClickAccountMenu = () => {
		setAnchorEl(null);
		navigate("/users/setting");
	};
	const handleClickMyPostsMenu = () => {
		setAnchorEl(null);
		navigate("/users/posts");
	};
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			// id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={() => setAnchorEl(null)}
		>
			<MenuItem onClick={handleClickAccountMenu}>
				<AccountCircle />
				アカウント詳細
			</MenuItem>
			<MenuItem onClick={handleClickMyPostsMenu}>
				<ListAltIcon />
				投稿した募集一覧
			</MenuItem>
		</Menu>
	);

	useEffect(() => {
		handleGetAllReactions();
	}, [notificationState]);

	return (
		<Box position="fixed" right={0} left={0} zIndex={1}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Photudio
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: "flex" }}>
						<IconButton
							onClick={() => {
								navigate("/users/reactions");
							}}
							size="large"
							color="inherit"
						>
							<Badge badgeContent={reactions.length} color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							// aria-label="account of current user"
							// aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleAccountMenuOpen}
							color="inherit"
						>
							<Avatar
								src={currentUser?.image?.url}
								sx={{ width: "30px", height: "30px" }}
							/>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMenu}
		</Box>
	);
});
