import { useContext, FC, memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "providers/AuthProvider";

export const Header: FC = memo(() => {
	const { loading, isSignIn } = useContext(AuthContext);

	const BarButtons = () => {
		if (!loading) {
			if (isSignIn) {
				return (
					<>
						{/* <NavLink
							to="/posts/new"
							style={({ isActive }) =>
								isActive ? { color: "blueGrey" } : { color: "inherit" }
							}
						>
							<IconButton color="inherit">
								<AddBoxIcon name="post" />
							</IconButton>
						</NavLink> */}
						<IconButton component={Link} to="/posts/new" color="inherit">
							<AddBoxIcon name="post" />
						</IconButton>
						<IconButton component={Link} to="/rooms" color="inherit">
							<ChatIcon name="dm" />
						</IconButton>
						<IconButton component={Link} to="users/setting" color="inherit">
							<AccountCircleIcon name="setting" />
						</IconButton>
					</>
				);
			} else {
				return <></>;
			}
		} else {
			return <></>;
		}
	};

	return (
		<Container sx={{ height: "10%" }}>
			<AppBar color="secondary">
				<Toolbar>
					<IconButton component={Link} to="/" color="inherit">
						<HomeIcon name="home" />
					</IconButton>
					<IconButton component={Link} to="/map" color="inherit">
						<LocationOnIcon name="map" />
					</IconButton>
					<BarButtons />
				</Toolbar>
			</AppBar>
			<Toolbar />
		</Container>
	);
});
