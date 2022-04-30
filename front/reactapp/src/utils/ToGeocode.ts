import Geocode from "react-geocode";
import { LatLng } from "types";

export const ToGeocode = (place: string) => {
	Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);

	return Geocode.fromAddress(place)
		.then(
			(res) => {
				console.log(res);
				const { lat, lng }: LatLng = res.results[0].geometry.location;
				return { lat, lng };
			},
			(error) => {
				throw new Error();
			}
		)
		.catch((e) => console.error(e));
};
