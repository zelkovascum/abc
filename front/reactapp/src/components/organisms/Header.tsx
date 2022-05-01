import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	IconButton,
	Container,
	Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Header: FC = memo(() => {
	return (
		<Container>
			<AppBar color="default">
				<Toolbar>
					<NavLink
						to="/"
						style={({ isActive }) => {
							return {
								display: "flex",
								alignItems: "center",
								textDecoration: "none",
								marginRight: "10px",
								color: isActive ? "teal" : "inherit",
							};
						}}
					>
						<IconButton color="inherit">
							<HomeIcon name="home" />
						</IconButton>
						<Typography fontSize={12}>HOME</Typography>
					</NavLink>
					<NavLink
						to="/map"
						style={({ isActive }) => {
							return {
								display: "flex",
								alignItems: "center",
								textDecoration: "none",
								marginRight: "10px",
								color: isActive ? "teal" : "inherit",
							};
						}}
					>
						<IconButton color="inherit">
							<LocationOnIcon name="map" />
						</IconButton>
						<Typography fontSize={12}>MAP</Typography>
					</NavLink>
					<NavLink
						to="/posts/new"
						style={({ isActive }) => {
							return {
								display: "flex",
								alignItems: "center",
								textDecoration: "none",
								marginRight: "10px",
								color: isActive ? "teal" : "inherit",
							};
						}}
					>
						<IconButton color="inherit">
							<AddBoxIcon name="post" />
						</IconButton>
						<Typography fontSize={12}>POST</Typography>
					</NavLink>
					<NavLink
						to="/rooms"
						style={({ isActive }) => {
							return {
								display: "flex",
								alignItems: "center",
								textDecoration: "none",
								marginRight: "10px",
								color: isActive ? "teal" : "inherit",
							};
						}}
					>
						<IconButton color="inherit">
							<ChatIcon name="dm" />
						</IconButton>
						<Typography fontSize={12}>DM</Typography>
					</NavLink>
					<NavLink
						to="/users/setting"
						style={({ isActive }) => {
							return {
								display: "flex",
								alignItems: "center",
								textDecoration: "none",
								marginRight: "10px",
								color: isActive ? "teal" : "inherit",
							};
						}}
					>
						<IconButton color="inherit">
							<AccountCircleIcon name="setting" />
						</IconButton>
						<Typography fontSize={12}>MYPAGE</Typography>
					</NavLink>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</Container>
	);
});
