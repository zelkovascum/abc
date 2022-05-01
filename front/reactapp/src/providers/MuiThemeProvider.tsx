import { FC, memo, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#2b8a8a",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#2b8a8a",
			contrastText: "#ffffff",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 768,
			lg: 1025,
			xl: 1536,
		},
	},
});

type Props = {
	children: ReactNode;
};

export const MuiThemeProvider: FC<Props> = memo((props) => {
	const { children } = props;

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});
