import { useState, useContext, MouseEvent, FC, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
	Box,
	Button,
	CardContent,
	Typography,
	TextField,
	Card,
} from "@mui/material";
import { SignInParams } from "types";
import { AuthContext } from "providers/AuthProvider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { signIn } from "utils/api/auth";
import { AlertMessage } from "../../molucules/AlertMessage";

export const SignIn: FC = () => {
	const { setIsSignIn, setCurrentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("test@example.com");
	const [password, setPassword] = useState<string>("password");
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);
	const processing = useRef(false);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (processing.current) return;
		processing.current = true;
		const params: SignInParams = {
			email,
			password,
		};
		try {
			const res = await signIn(params);
			if (res.status === 200) {
				// ログインに成功した場合はCookieに各値を格納
				Cookies.set("_access_token", res.headers["access-token"]);
				Cookies.set("_client", res.headers["client"]);
				Cookies.set("_uid", res.headers["uid"]);
				setIsSignIn(true);
				setCurrentUser(res.data.data);
				navigate("/");
				console.log("Signed in successfully!");
				processing.current = false;
			} else {
				setIsAlertMessageOpen(true);
				processing.current = false;
			}
		} catch (e) {
			console.error(e);
			setIsAlertMessageOpen(true);
			processing.current = false;
		}
	};

	return (
		<Box sx={{ width: "330px", m: "auto" }}>
			<form noValidate autoComplete="off">
				<Card sx={{ textAlign: "center", boxShadow: "0px 0px 5px 1px" }}>
					<CardContent>
						<Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
							Photudio
						</Typography>
						<CameraAltIcon sx={{ fontSize: 32 }} />
					</CardContent>
					<CardContent>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="メールアドレス"
							value={email}
							margin="dense"
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="パスワード"
							type="password"
							placeholder="最低6文字"
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
							disabled={!(email && password)}
							onClick={handleSubmit}
						>
							ログイン
						</Button>
						<Box textAlign="center">
							<Typography variant="body2">
								アカウントをお持ちでないですか？ &nbsp;
								<Link to="/signup">登録する</Link>
							</Typography>
						</Box>
					</CardContent>
				</Card>
				<Box
					sx={{ display: { sm: "block", md: "none" }, height: "100px" }}
				></Box>
			</form>
			<AlertMessage
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="error"
				message="メールアドレスまたはパスワードが無効です"
			/>
		</Box>
	);
};
