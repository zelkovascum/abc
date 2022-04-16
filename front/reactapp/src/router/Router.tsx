import { Home } from "components/pages/Home";
import { SignIn } from "components/pages/SignIn";
import { SignUp } from "components/pages/SignUp";
import { AuthContext } from "providers/AuthProvider";
import { ReactElement, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Map } from "components/pages/Map";

export const Router = () => {
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
			<Route path="/" element={<Private children={<Home />} />} />
		</Routes>
	);
};
