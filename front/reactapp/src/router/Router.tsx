import { Home } from "components/pages/Home";
import { SignIn } from "components/pages/SignIn";
import { SignUp } from "components/pages/SignUp";
import { AuthContext } from "providers/AuthProvider";
import { FC, memo, ReactElement, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Map } from "components/pages/Map";
import { Geo } from "components/molucules/Geo";
import { PostNew } from "../components/pages/PostNew";
import { SearchPlace } from "components/molucules/SearchPlace";

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
			<Route path="geo" element={<Geo />} />
			<Route path="post" element={<PostNew />} />
			<Route path="/" element={<Private children={<Home />} />} />
		</Routes>
	);
});
