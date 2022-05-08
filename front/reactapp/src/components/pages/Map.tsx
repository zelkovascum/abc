import { FC, memo, useContext, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { Post } from "types";
import { Box, useMediaQuery } from "@mui/material";
import { MapContext } from "providers/MapProvider";
import { theme } from "providers/MuiThemeProvider";

const sMcontainerStyle = {
	width: "300px",
	height: "300px",
};
const mDcontainerStyle = {
	width: "400px",
	height: "400px",
};
const lGcontainerStyle = {
	width: "500px",
	height: "500px",
};

export const Map: FC = memo(() => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState<Post[]>();
	const { lat, lng } = useContext(MapContext);
	const downSm = useMediaQuery(() => theme.breakpoints.down("sm"));
	const downmd = useMediaQuery(() => theme.breakpoints.down("md"));

	useEffect(() => {
		getAllPosts().then((res) => {
			setPosts(res.data);
		});
	}, []);

	return (
		<Box m={4}>
			<GoogleMap
				mapContainerStyle={
					downmd
						? downSm
							? sMcontainerStyle
							: mDcontainerStyle
						: lGcontainerStyle
				}
				center={{ lat, lng }}
				zoom={11}
			>
				{posts?.map((post) => (
					<Marker
						key={post.id}
						position={{
							lat: Number(post.lat),
							lng: Number(post.lng),
						}}
						label={{
							color: "white",
							fontFamily: "sans-serif",
							fontSize: "15px",
							fontWeight: "100",
							text: post.content,
						}}
						onClick={() => {
							navigate(`/users/${post.user.id}`);
						}}
					/>
				))}
			</GoogleMap>
		</Box>
	);
});
