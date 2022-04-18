import axios from "axios";
import { postsIndex,postsCreate } from "../../urls/index";

export const fetchPosts = () => {
  return axios
  .get(postsIndex)
  .then((res) => {
    return res.data;
  })
  .catch((e) => console.error(e));
};

type Params = {
  lat: number;
  lng: number;
  place: string;
  dateTime: any; //要修正
  content: string;
};

export const postPosts = (params: Params) => {
	const { lat, lng, place, dateTime, content } = params;

	// console.log(lat);
	// console.log(lng);
	// console.log(place);
	// console.log(dateTime);
	// console.log(content);

	return axios
		.post(postsCreate, {
			lat: lat,
			lng: lng,
			place: place,
			date_time: dateTime,
			content: content,
		})
		.then((res) => {
			console.log("functionOK");
			return res.data;
		})
		.catch((e) =>
			// console.error(e)
			console.log("funcError")
		);
};
