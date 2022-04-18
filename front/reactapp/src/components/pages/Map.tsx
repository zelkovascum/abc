import { FC, memo } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const containerStyle = {
	width: "400px",
	height: "400px",
};

const center = {
	lat: 35.6803997,
	lng: 139.7690174,
};

const positionAkiba = {
	lat: 35.659034,
	lng: 139.7016,
};

const markerLabelAkiba = {
	color: "white",
	fontFamily: "sans-serif",
	fontSize: "15px",
	fontWeight: "100",
	text: "5",
};

export const Map: FC = memo(() => {
	const navigate = useNavigate();

	return (
		<LoadScriptNext
			googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
		>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
				<Marker
					position={positionAkiba}
					label={markerLabelAkiba}
					onClick={() => {
						navigate("/");
					}}
				/>
			</GoogleMap>
		</LoadScriptNext>
	);
});
