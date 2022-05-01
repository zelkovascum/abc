import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Container } from "@mui/material";
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
						style={({ isActive }) =>
							isActive ? { color: "teal" } : { color: "inherit" }
						}
					>
						<IconButton color="inherit">
							<HomeIcon name="home" />
						</IconButton>
					</NavLink>
					<NavLink
						to="/map"
						style={({ isActive }) =>
							isActive ? { color: "teal" } : { color: "inherit" }
						}
					>
						<IconButton color="inherit">
							<LocationOnIcon name="map" />
						</IconButton>
					</NavLink>
					<NavLink
						to="/posts/new"
						style={({ isActive }) =>
							isActive ? { color: "teal" } : { color: "inherit" }
						}
					>
						<IconButton color="inherit">
							<AddBoxIcon name="post" />
						</IconButton>
					</NavLink>
					<NavLink
						to="/rooms"
						style={({ isActive }) =>
							isActive ? { color: "teal" } : { color: "inherit" }
						}
					>
						<IconButton color="inherit">
							<ChatIcon name="dm" />
						</IconButton>
					</NavLink>
					<NavLink
						to="/users/setting"
						style={({ isActive }) =>
							isActive ? { color: "teal" } : { color: "inherit" }
						}
					>
						<IconButton color="inherit">
							<AccountCircleIcon name="setting" />
						</IconButton>
					</NavLink>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</Container>
	);
});
