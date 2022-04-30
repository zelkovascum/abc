import { Router } from "router/Router";
import { AuthProvider } from "providers/AuthProvider";
import { MuiThemeProvider } from "providers/MuiThemeProvider";
import { LoadScriptNext } from "@react-google-maps/api";

export function App() {
	return (
		<MuiThemeProvider>
			<AuthProvider>
				<LoadScriptNext
					googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
					libraries={["places"]}
				>
					<Router />
				</LoadScriptNext>
			</AuthProvider>
		</MuiThemeProvider>
	);
}
