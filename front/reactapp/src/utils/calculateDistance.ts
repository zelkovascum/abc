import { LatLng } from "types";
import { toGeocode } from "utils/toGeocode";

export const calculateDistance = async (point1: string, point2: string) => {
	const geocode1: LatLng | void = await toGeocode(point1)
		.then((res) => {
			const lat = res!.lat;
			const lng = res!.lng;
			return { lat, lng };
		})
		.catch((e) => {
			console.error(e);
		});

	const geocode2: LatLng | void = await toGeocode(point2)
		.then((res) => {
			const lat = res!.lat;
			const lng = res!.lng;
			return { lat, lng };
		})
		.catch((e) => {
			console.error(e);
		});

	let lat1 = geocode1!.lat;
	let lng1 = geocode1!.lng;
	let lat2 = geocode2!.lat;
	let lng2 = geocode2!.lng;

	lat1 *= Math.PI / 180;
	lng1 *= Math.PI / 180;
	lat2 *= Math.PI / 180;
	lng2 *= Math.PI / 180;

	return (
		6371 *
		Math.acos(
			Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
				Math.sin(lat1) * Math.sin(lat2)
		)
	);
};
