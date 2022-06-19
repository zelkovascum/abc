import { FC, memo, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "providers/AuthProvider";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const PrivateRoute: FC = memo(() => {
	const { loading, isSignIn } = useContext(AuthContext);

	if (!loading) {
		if (!isSignIn) {
			return <Navigate to="/signin" replace />;
		}
		return <Outlet />;
	}
	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
	);
});
