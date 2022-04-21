import { FC, memo, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "providers/AuthProvider";

export const PrivateRoute: FC = memo(() => {
	const { loading, isSignIn } = useContext(AuthContext);

	if (!loading) {
		if (!isSignIn) {
			return <Navigate to="/signin" replace />;
		}
		return <Outlet />;
	} else {
		return <></>;
	}
});
