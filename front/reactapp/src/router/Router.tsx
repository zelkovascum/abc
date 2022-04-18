import { Home } from "components/pages/Home";
import { SignIn } from "components/pages/SignIn";
import { SignUp } from "components/pages/SignUp";
import { AuthContext } from "providers/AuthProvider";
import { FC, memo, ReactElement, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Map } from "components/pages/Map";
import { PostNew } from "../components/pages/PostNew";

export const Router: FC = memo(() => {
	const { loading, isSignedIn } = useContext(AuthContext);
	const Private = ({ children }: { children: ReactElement }) => {
		if (!loading) {
			if (isSignedIn) {
				return children;
			} else {
				return <Navigate to="/signin" replace />;
			}
		} else {
			return <></>;
		}
	};

	return (
		<Routes>
			<Route path="signup" element={<SignUp />} />
			<Route path="signin" element={<SignIn />} />
			<Route path="map" element={<Map />} />
			<Route path="post/new" element={<PostNew />} />
			<Route path="/" element={<Private children={<Home />} />} />
		</Routes>
	);
});
