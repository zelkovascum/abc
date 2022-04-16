import React from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const containerStyle = {
	width: "500px",
	height: "500px",
};

const center = {
	lat: 35.658034,
	lng: 139.701636,
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

export const Map = () => {
	const navigate = useNavigate();

	return (
		<LoadScriptNext googleMapsApiKey="AIzaSyBj4C_VPlhSbwgGC58c_l3f-dB5EgV7K_Y">
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
};

React.memo(Map);
