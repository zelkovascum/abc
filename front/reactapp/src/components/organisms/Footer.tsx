import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	useMediaQuery,
	Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { theme } from "providers/MuiThemeProvider";

export const Footer: FC = memo(() => {
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<AppBar position="fixed" sx={{ top: "auto", bottom: 0 }} color="default">
			<Toolbar>
				<Grid container direction="row" justifyContent="center" ml={5}>
					<Grid item xs={2.4} m="auto">
						<NavLink
							to="/"
							style={({ isActive }) => {
								return {
									display: "flex",
									alignItems: "center",
									textDecoration: "none",
									color: isActive ? "teal" : "inherit",
								};
							}}
						>
							<IconButton color="inherit">
								<HomeIcon name="home" />
							</IconButton>
							{matches ? <></> : <Typography fontSize={12}>HOME</Typography>}
						</NavLink>
					</Grid>
					<Grid item xs={2.4}>
						<NavLink
							to="/map"
							style={({ isActive }) => {
								return {
									display: "flex",
									alignItems: "center",
									textDecoration: "none",
									color: isActive ? "teal" : "inherit",
								};
							}}
						>
							<IconButton color="inherit">
								<LocationOnIcon name="map" />
							</IconButton>
							{matches ? <></> : <Typography fontSize={12}>MAP</Typography>}
						</NavLink>
					</Grid>
					<Grid item xs={2.4}>
						<NavLink
							to="/posts/new"
							style={({ isActive }) => {
								return {
									display: "flex",
									alignItems: "center",
									textDecoration: "none",
									color: isActive ? "teal" : "inherit",
								};
							}}
						>
							<IconButton color="inherit">
								<AddBoxIcon name="post" />
							</IconButton>
							{matches ? <></> : <Typography fontSize={12}>POST</Typography>}
						</NavLink>
					</Grid>
					<Grid item xs={2.4}>
						<NavLink
							to="/rooms"
							style={({ isActive }) => {
								return {
									display: "flex",
									alignItems: "center",
									textDecoration: "none",
									color: isActive ? "teal" : "inherit",
								};
							}}
						>
							<IconButton color="inherit">
								<ChatIcon name="dm" />
							</IconButton>
							{matches ? <></> : <Typography fontSize={12}>DM</Typography>}
						</NavLink>
					</Grid>
					<Grid item xs={2.4}>
						<NavLink
							to="/users/setting"
							style={({ isActive }) => {
								return {
									display: "flex",
									alignItems: "center",
									textDecoration: "none",
									color: isActive ? "teal" : "inherit",
								};
							}}
						>
							<IconButton color="inherit">
								<AccountCircleIcon name="setting" />
							</IconButton>
							{matches ? <></> : <Typography fontSize={12}>MYPAGE</Typography>}
						</NavLink>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
});
