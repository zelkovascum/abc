import {
	createContext,
	FC,
	memo,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthContext } from "providers/AuthProvider";
import { toGeocode } from "utils/ToGeocode";

export const MapContext = createContext(
	{} as {
		lat: number;
		lng: number;
	}
);

type Props = {
	children: ReactNode;
};

export const MapProvider: FC<Props> = memo((props) => {
	const { children } = props;
	const [lat, setLat] = useState<number>(35.6803997);
	const [lng, setLng] = useState<number>(139.7690174);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (!currentUser?.address) return;
		toGeocode(currentUser?.address!)
			.then((res) => {
				setLat(res!.lat);
				setLng(res!.lng);
			})
			.catch((e) => {
				console.error(e);
			});
	}, [currentUser]);

	return (
		<MapContext.Provider value={{ lat, lng }}>{children}</MapContext.Provider>
	);
});
