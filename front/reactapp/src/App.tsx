import { Router } from "router/Router";
import { LoadScriptNext } from "@react-google-maps/api";
import { AuthProvider } from "providers/AuthProvider";
import { MapProvider } from "providers/MapProvider";
import { MuiThemeProvider } from "providers/MuiThemeProvider";
import { ReactionNotificationProvider } from "providers/ReactionNotificationProvider";

export function App() {
	return (
		<MuiThemeProvider>
			<AuthProvider>
				<MapProvider>
					<ReactionNotificationProvider>
						<LoadScriptNext
							googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
							libraries={["places"]}
							loadingElement={<></>}
						>
							<Router />
						</LoadScriptNext>
					</ReactionNotificationProvider>
				</MapProvider>
			</AuthProvider>
		</MuiThemeProvider>
	);
}
