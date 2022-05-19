import { FC, memo } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
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
	const location = useLocation();

	return (
		<AppBar position="fixed" sx={{ top: "auto", bottom: 0 }} color="default">
			<Toolbar>
				<Grid container direction="row" justifyContent="center" ml={5}>
					<Grid item xs={2.4} m="auto">
						{/* <NavLink
							to="/"
							style={({ isActive }) => {
								return {
									display: "flex",
									alignItems: "center",
									textDecoration: "none",
									color: isActive ? "teal" : "inherit",
								};
							}}
						> */}
						<Link
							to="/"
							style={{
								display: "flex",
								alignItems: "center",
								textDecoration: "none",
								color:
									location.pathname === "/"
										? "teal"
										: location.pathname === "/near"
										? "teal"
										: "inherit",
							}}
						>
							<>{console.log(location.pathname)}</>
							<IconButton color="inherit">
								<HomeIcon name="home" />
							</IconButton>
							{matches ? <></> : <Typography fontSize={12}>HOME</Typography>}
						</Link>
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

// import { FC, memo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
// 	AppBar,
// 	Toolbar,
// 	IconButton,
// 	Typography,
// 	useMediaQuery,
// 	Grid,
// 	Box,
// 	BottomNavigation,
// 	BottomNavigationAction,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import ChatIcon from "@mui/icons-material/Chat";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { theme } from "providers/MuiThemeProvider";

// export const Footer: FC = memo(() => {
// 	const matches = useMediaQuery(theme.breakpoints.down("sm"));
// 	const navigate = useNavigate();
// 	const [value, setValue] = useState(0);

// 	return (
// 		<Box sx={{ position: "fixed", width: "100%", top: "auto", bottom: 0 }}>
// 			<BottomNavigation
// 				showLabels
// 				value={value}
// 				onChange={(event, newValue) => {
// 					setValue(newValue);
// 				}}
// 			>
// 				<BottomNavigationAction
// 					onClick={() => navigate("/")}
// 					label="HOME"
// 					icon={<ChatIcon />}
// 				/>
// 				<BottomNavigationAction
// 					onClick={() => navigate("/map")}
// 					label="MAP"
// 					icon={<LocationOnIcon />}
// 				/>
// 				<BottomNavigationAction
// 					onClick={() => navigate("/posts/new")}
// 					label="POST"
// 					icon={<AddBoxIcon />}
// 				/>
// 				<BottomNavigationAction
// 					onClick={() => navigate("/rooms")}
// 					label="DM"
// 					icon={<ChatIcon />}
// 				/>
// 				<BottomNavigationAction
// 					onClick={() => navigate("/users/setting")}
// 					label="MYPAGE"
// 					icon={<AccountCircleIcon />}
// 				/>
// 			</BottomNavigation>
// 		</Box>
// 	);
// });
