import { createContext, FC, memo, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "utils/api/auth";
import { User } from "types";

export const AuthContext = createContext(
	{} as {
		loading: boolean;
		setLoading: React.Dispatch<React.SetStateAction<boolean>>;
		isSignIn: boolean;
		setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
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
	const [isSignIn, setIsSignIn] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | undefined>();

	// 認証済みのユーザーがいるかどうかチェック
	// 確認できた場合はそのユーザーの情報を取得
	const handleGetCurrentUser = async () => {
		try {
			const res = await getCurrentUser();
			if (res?.data.isLogin === true) {
				setIsSignIn(true);
				setCurrentUser(res?.data.data);
			} else {
				console.log("No exist current user");
			}
		} catch (e) {
			console.error(e);
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
				isSignIn,
				setIsSignIn,
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
});
