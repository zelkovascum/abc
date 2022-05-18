import { FC, memo, useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { User } from "types";
import { getAllReactions } from "utils/api/reaction";

export const Header: FC = memo(() => {
	const [reactions, setReactions] = useState<User[]>([]);
	const navigate = useNavigate();

	const handleGetAllReactions = async () => {
		try {
			const res = await getAllReactions();
			setReactions(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetAllReactions();
	}, []);

	return (
		<Box position="fixed" right={0} left={0} zIndex={1}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						Photudio
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
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
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
});

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));
