import { Router } from "router/Router";
import { AuthProvider } from "providers/AuthProvider";
import { MuiThemeProvider } from "providers/MuiThemeProvider";

export const App = () => {
	return (
		<MuiThemeProvider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</MuiThemeProvider>
	);
};
