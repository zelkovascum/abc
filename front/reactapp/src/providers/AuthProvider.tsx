import { createContext, FC, memo, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "utils/api/auth";
import { User } from "types";

export const AuthContext = createContext(
	{} as {
		loading: boolean;
		setLoading: React.Dispatch<React.SetStateAction<boolean>>;
		isSignedIn: boolean;
		setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
		currentUser: User | undefined;
		setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	}
);

type Props = {
	children: ReactNode;
};

export const AuthProvider: FC<Props> = memo((props) => {
	const { children } = props;
	const [loading, setLoading] = useState<boolean>(true);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | undefined>();

	// 認証済みのユーザーがいるかどうかチェック
	// 確認できた場合はそのユーザーの情報を取得
	const handleGetCurrentUser = async () => {
		try {
			const res = await getCurrentUser();
			if (res?.data.isLogin === true) {
				setIsSignedIn(true);
				setCurrentUser(res?.data.data);
				console.log(res?.data.data);
			} else {
				console.log("No current user");
			}
		} catch (err) {
			console.log(err);
		}

		setLoading(false);
	};

	useEffect(() => {
		handleGetCurrentUser();
	}, [setCurrentUser]);

	return (
		<AuthContext.Provider
			value={{
				loading,
				setLoading,
				isSignedIn,
				setIsSignedIn,
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
});
