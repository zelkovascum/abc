import { Router } from "router/Router";
import { AuthProvider } from "providers/AuthProvider";

export const App = () => {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	);
};
