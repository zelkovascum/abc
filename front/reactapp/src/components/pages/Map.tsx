import { FC, memo, useContext, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "utils/api/post";
import { Post } from "types";
import { Box, useMediaQuery } from "@mui/material";
import { MapContext } from "providers/MapProvider";
import { theme } from "providers/MuiThemeProvider";
import { SearchByDateTime } from "components/molucules/posts/SearchByDateTime";

export const Map: FC = memo(() => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState<Post[]>([]);
	const [dateTimeInputValue, setDateTimeInputValue] = useState<Date | null>(
		null
	);
	const { lat, lng } = useContext(MapContext);
	const downSm = useMediaQuery(() => theme.breakpoints.down("sm"));
	const downmd = useMediaQuery(() => theme.breakpoints.down("md"));

	const handleSearchPosts = () => {
		const PostsSortedByDateTime = [...posts].filter((post) => {
			return dateTimeInputValue! < new Date(post.dateTime);
		});
		setPosts(PostsSortedByDateTime);
	};

	useEffect(() => {
		getAllPosts().then((res) => {
			setPosts(res.data);
		});
	}, []);

	return (
		<Box m={1}>
			<Box sx={{ mb: 1 }}>
				<SearchByDateTime
					dateTimeInputValue={dateTimeInputValue}
					setDateTimeInputValue={setDateTimeInputValue}
					handleSearch={handleSearchPosts}
				/>
			</Box>
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
						onClick={() => {
							navigate(`/posts/${post.id}`);
						}}
					/>
				))}
			</GoogleMap>
		</Box>
	);
});

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
