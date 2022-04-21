import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "components/pages/users/SignIn";
import { SignUp } from "components/pages/users/SignUp";
import { Map } from "components/pages/Map";
import { PostsNew } from "components/pages/posts/PostsNew";
import { Home } from "components/pages/posts/Home";
import { Rooms } from "components/pages/rooms/Rooms";
import { Room } from "components/pages/rooms/Room";
import { Profile } from "components/pages/users/Profile";
import { Setting } from "components/pages/users/Setting";
import { NotFound } from "components/pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";

export const Router: FC = memo(() => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/users/:id" element={<Profile />} />
			<Route path="/map" element={<Map />} />
			<Route path="*" element={<NotFound />} />

			<Route element={<PrivateRoute />}>
				<Route path="/posts/new" element={<PostsNew />} />
				<Route path="/users/setting" element={<Setting />} />
				<Route path="/rooms" element={<Rooms />} />
				<Route path="/rooms/:id" element={<Room />} />
			</Route>
		</Routes>
	);
});
