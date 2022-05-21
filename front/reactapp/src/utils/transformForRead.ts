// export const transformPlace = (place: string) => place.replace("日本、", "");
export const transformPlace = (place: string) => {
	if (place.startsWith("日本、〒")) {
		return place.slice(13);
	} else {
		return place;
	}
};

export const transformDateTime = (dateTime: string) =>
	dateTime.replace(/-/g, "/").replace("T", " ").slice(0, -8);
