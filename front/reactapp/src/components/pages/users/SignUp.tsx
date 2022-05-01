import { useState, useContext, MouseEvent, FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import { SignUpParams } from "types";
import { AuthContext } from "providers/AuthProvider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { AlertMessage } from "components/molucules/AlertMessage";
import { signUp } from "utils/api/auth";

export const SignUp: FC = memo(() => {
	const navigate = useNavigate();

	const { setIsSignIn, setCurrentUser } = useContext(AuthContext);

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const params: SignUpParams = {
			name,
			email,
			password,
			passwordConfirmation,
		};

		try {
			const res = await signUp(params);
			console.log(res);

			if (res.status === 200) {
				// アカウント作成と同時にログイン
				Cookies.set("_access_token", res.headers["access-token"]);
				Cookies.set("_client", res.headers["client"]);
				Cookies.set("_uid", res.headers["uid"]);

				setIsSignIn(true);
				setCurrentUser(res.data.data);

				navigate("/");

				console.log("Signed in successfully!");
			} else {
				setIsAlertMessageOpen(true);
			}
		} catch (e) {
			console.error(e);
			setIsAlertMessageOpen(true);
		}
	};

	return (
		<Box width="350px" margin="auto">
			<form noValidate autoComplete="off">
				<Card sx={{ textAlign: "center", boxShadow: "0px 0px 10px 5px" }}>
					<CardContent>
						<Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
							Photudio
						</Typography>
						<CameraAltIcon sx={{ fontSize: 35 }} />
					</CardContent>
					<CardContent>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="ユーザーネーム"
							value={name}
							margin="dense"
							onChange={(event) => setName(event.target.value)}
						/>
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
						<TextField
							variant="outlined"
							required
							fullWidth
							label="パスワード再入力"
							placeholder="最低6文字"
							type="password"
							value={passwordConfirmation}
							margin="dense"
							autoComplete="current-password"
							onChange={(event) => setPasswordConfirmation(event.target.value)}
						/>
						<Button
							type="submit"
							variant="contained"
							size="large"
							fullWidth
							color="primary"
							disabled={!(name && email && password && passwordConfirmation)}
							onClick={handleSubmit}
						>
							登録
						</Button>
					</CardContent>
				</Card>
			</form>
			<AlertMessage
				open={isAlertMessageOpen}
				setOpen={setIsAlertMessageOpen}
				severity="error"
				message="メールアドレスまたはパスワードが無効です"
			/>
		</Box>
	);
});
