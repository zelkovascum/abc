import { FC, memo, useEffect, useState } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { Post } from "types";
import { Box } from "@mui/material";

const containerStyle = {
	width: "400px",
	height: "400px",
};

const center = {
	lat: 35.6803997,
	lng: 139.7690174,
};

export const Map: FC = memo(() => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState<Post[]>();

	useEffect(() => {
		getAllPosts().then((res) => {
			setPosts(res.data);
		});
	}, []);

	return (
		<Box m={4}>
			{/* <LoadScriptNext
				googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
				libraries={["places"]}
			> */}
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
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
			{/* </LoadScriptNext> */}
		</Box>
	);
});
