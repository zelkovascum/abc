import { useState, useContext, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
	Button,
	Card,
	CardHeader,
	CardContent,
	TextField,
} from "@mui/material";
import { signUp } from "../../libs/api/auth";
import { AlertMessage } from "../utils/AlertMessage";
import { SignUpParams } from "types";
import { AuthContext } from "providers/AuthProvider";

// サインアップ用ページ
export const SignUp = () => {
	const navigate = useNavigate();

	const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
	const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(false);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const params: SignUpParams = {
			name: name,
			email: email,
			password: password,
			passwordConfirmation: passwordConfirmation,
		};

		try {
			const res = await signUp(params);
			console.log(res);

			if (res.status === 200) {
				// アカウント作成と同時にログインさせてしまう
				// 本来であればメール確認などを挟むべきだが、今回はサンプルなので
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
					<CardHeader title="Sign Up" />
					<CardContent>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="Name"
							value={name}
							margin="dense"
							onChange={(event) => setName(event.target.value)}
						/>
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
							value={password}
							margin="dense"
							autoComplete="current-password"
							onChange={(event) => setPassword(event.target.value)}
						/>
						<TextField
							variant="outlined"
							required
							fullWidth
							label="Password Confirmation"
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
							disabled={
								!name || !email || !password || !passwordConfirmation
									? true
									: false
							}
							onClick={handleSubmit}
						>
							Submit
						</Button>
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
