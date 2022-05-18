import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "components/pages/users/SignIn";
import { SignUp } from "components/pages/users/SignUp";
import { Map } from "components/pages/Map";
import { NewPost } from "components/pages/posts/NewPost";
import { Home } from "components/pages/posts/Home";
import { Rooms } from "components/pages/rooms/Rooms";
import { Room } from "components/pages/rooms/Room";
import { Profile } from "components/pages/users/Profile";
import { Setting } from "components/pages/users/Setting";
import { NotFound } from "components/pages/NotFound";
import { CommonLayout } from "components/templates/CommonLayout";
import { TopLayout } from "components/templates/TopLayout";
import { PrivateRoute } from "./PrivateRoute";
import { Reactions } from "components/pages/reactions/Reactions";
import { PostShow } from "components/pages/posts/PostShow";

export const Router: FC = memo(() => (
	<BrowserRouter>
		<Routes>
			<Route element={<TopLayout />}>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Route>

			<Route element={<PrivateRoute />}>
				<Route element={<CommonLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/near" element={<Home />} />
					<Route path="/map" element={<Map />} />
					<Route path="/posts/new" element={<NewPost />} />
					<Route path="/posts/:id" element={<PostShow />} />
					<Route path="/users/:id" element={<Profile />} />
					<Route path="/users/setting" element={<Setting />} />
					<Route path="/users/reactions" element={<Reactions />} />
					<Route path="/rooms" element={<Rooms />} />
					<Route path="/rooms/:id" element={<Room />} />
				</Route>
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
));
