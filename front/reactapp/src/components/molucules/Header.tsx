import { MouseEvent, useContext, FC, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	// Menu,
} from "@mui/material";
import { AuthContext } from "providers/AuthProvider";
import { signOut } from "utils/api/auth";

export const Header: FC = memo(() => {
	const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			const res = await signOut();

			if (res.data.success === true) {
				// サインアウト時には各Cookieを削除
				Cookies.remove("_access_token");
				Cookies.remove("_client");
				Cookies.remove("_uid");

				setIsSignedIn(false);
				navigate("/signin");

				console.log("Succeeded in sign out");
			} else {
				console.log("Failed in sign out");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const AuthButtons = () => {
		// 認証完了後はサインアウト用のボタンを表示
		// 未認証時は認証用のボタンを表示
		if (!loading) {
			if (isSignedIn) {
				return (
					<>
						<Button component={Link} to="/posts/new" color="inherit">
							PostaNew
						</Button>
						<Button component={Link} to="/rooms" color="inherit">
							DM
						</Button>
						<Button color="inherit" onClick={handleSignOut}>
							Sign out
						</Button>
					</>
				);
			} else {
				return (
					<>
						<Button component={Link} to="/signin" color="inherit">
							Sign in
						</Button>
						<Button component={Link} to="/signup" color="inherit">
							Sign Up
						</Button>
					</>
				);
			}
		} else {
			return <></>;
		}
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit">
						{/* <Menu /> */}
					</IconButton>
					<Typography component={Link} to="/" variant="h6">
						Mypage
					</Typography>
					<Button component={Link} to="/posts" color="inherit">
						Postindex
					</Button>
					<Button component={Link} to="/map" color="inherit">
						map
					</Button>
					<AuthButtons />
				</Toolbar>
			</AppBar>
		</>
	);
});
