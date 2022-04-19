import { Home } from "components/pages/Home";
import { SignIn } from "components/pages/users/SignIn";
import { SignUp } from "components/pages/users/SignUp";
import { AuthContext } from "providers/AuthProvider";
import { FC, memo, ReactElement, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Map } from "components/pages/Map";
import { PostsNew } from "../components/pages/posts/PostsNew";
import { PostsIndex } from "components/pages/posts/PostsIndex";
import { Rooms } from "components/pages/rooms/Rooms";
import { Room } from "components/pages/rooms/Room";
import { Profile } from "components/pages/users/Profile";

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
			<Route path="posts/new" element={<PostsNew />} />
			<Route path="posts" element={<PostsIndex />} />
			<Route path="rooms" element={<Rooms />} />
			<Route path="rooms/:id" element={<Room />} />
			<Route path="user/:id" element={<Profile />} />
			<Route path="/" element={<Private children={<Home />} />} />
		</Routes>
	);
});
