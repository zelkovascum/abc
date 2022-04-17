import { useState, FC, memo } from "react";
import Geocode from "react-geocode";

export const Geo: FC = memo(() => {
	const [place, setPlace] = useState("");

	const PushData = () => {
		Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);
		Geocode.fromAddress(place).then(
			(res) => {
				const { lat, lng } = res.results[0].geometry.location;
				console.log(lat, lng);
			},
			(error) => {
				console.error(error);
			}
		);
	};

	return (
		<div>
			<h1>map</h1>
			<input
				type="text"
				onChange={(e) => {
					setPlace(e.target.value);
				}}
			></input>
			<button
				onClick={() => {
					PushData();
				}}
			>
				search
			</button>
		</div>
	);
});
