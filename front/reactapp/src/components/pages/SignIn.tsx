import { useState, useContext, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
	Box,
	Button,
	CardHeader,
	CardContent,
	Typography,
	TextField,
	Card,
} from "@mui/material";
import { signIn } from "../../libs/api/auth";
import { AlertMessage } from "../utils/AlertMessage";
import { SignInParams } from "types";
import { AuthContext } from 'providers/AuthProvider';

// サインイン用ページ
export const SignIn = () => {
	const navigate = useNavigate();

	const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const params: SignInParams = {
			email: email,
			password: password,
		};

		try {
			const res = await signIn(params);
			console.log(res);

			if (res.status === 200) {
				// ログインに成功した場合はCookieに各値を格納
				Cookies.set("_access_token", res.headers["access-token"]);
				Cookies.set("_client", res.headers["client"]);
				Cookies.set("_uid", res.headers["uid"]);

				setIsSignedIn(true);
				setCurrentUser(res.data.data);

				navigate("/");

				console.log("Signed in successfully!");
			} else {
				setIsAlertMessageOpen(true);
			}
		} catch (err) {
			console.log(err);
			setIsAlertMessageOpen(true);
		}
	};

	return (
		<>
			<form noValidate autoComplete="off">
				<Card>
					<CardHeader title="Sign In" />
					<CardContent>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="Email"
							value={email}
							margin="dense"
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="Password"
							type="password"
							placeholder="At least 6 characters"
							value={password}
							margin="dense"
							autoComplete="current-password"
							onChange={(event) => setPassword(event.target.value)}
						/>
						<Button
							type="submit"
							variant="contained"
							size="large"
							fullWidth
							color="primary"
							disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
							onClick={handleSubmit}
						>
							Submit
						</Button>
						<Box textAlign="center">
							<Typography variant="body2">
								Don't have an account? &nbsp;
								<Link to="/signup">Sign Up now!</Link>
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</form>
			<AlertMessage // エラーが発生した場合はアラートを表示
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="error"
				message="Invalid emai or password"
			/>
		</>
	);
};
