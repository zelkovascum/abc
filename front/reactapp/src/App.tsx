import { Router } from "router/Router";
import { LoadScriptNext } from "@react-google-maps/api";
import { AuthProvider } from "providers/AuthProvider";
import { MapProvider } from "providers/MapProvider";
import { MuiThemeProvider } from "providers/MuiThemeProvider";
import { NotificationProvider } from "providers/NotificationProvider";

export function App() {
	return (
		<MuiThemeProvider>
			<AuthProvider>
				<MapProvider>
					<NotificationProvider>
						<LoadScriptNext
							googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
							libraries={["places"]}
							loadingElement={<></>}
						>
							<Router />
						</LoadScriptNext>
					</NotificationProvider>
				</MapProvider>
			</AuthProvider>
		</MuiThemeProvider>
	);
}
