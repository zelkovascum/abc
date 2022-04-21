export const transformPlace = (place: string) => {
	return place.replace("日本、", "");
};

export const transformDateTime = (dateTime: string) => {
	return dateTime.replace(/-/g, "/").replace("T", " ").slice(0, -8);
};
