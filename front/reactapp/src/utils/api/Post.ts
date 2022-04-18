import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../../urls/index";

export const fetchRestaurants = () => {
	return axios
		.get(DEFAULT_API_LOCALHOST)
		.then((res) => {
			return res.data;
		})
		.catch((e) => console.error(e));
};
