export const transformPlace = (place: string) => place.replace("日本、", "");

export const transformDateTime = (dateTime: string) =>
	dateTime.replace(/-/g, "/").replace("T", " ").slice(0, -8);
