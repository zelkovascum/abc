import { BrowserRouter } from "react-router-dom";
import { CommonLayout } from "./components/templates/CommonLayout";
import { Router } from "router/Router";
import { AuthProvider } from "providers/AuthProvider";

export const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<CommonLayout>
					<Router />
				</CommonLayout>
			</BrowserRouter>
		</AuthProvider>
	);
};
