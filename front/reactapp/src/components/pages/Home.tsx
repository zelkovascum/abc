import { FC, memo, useContext } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "providers/AuthProvider";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: FC = memo(() => {
	const { isSignedIn, currentUser } = useContext(AuthContext);

	return (
		<>
			{isSignedIn && currentUser ? (
				<>
					<Avatar alt={currentUser?.name} src="" />
					<p>Email: {currentUser?.email}</p>
					<p>Name: {currentUser?.name}</p>
				</>
			) : (
				<p>Not signed in</p>
			)}
		</>
	);
});
