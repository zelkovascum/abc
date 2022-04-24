import { FC, memo, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		secondary: {
			main: "#32a9b8",
			contrastText: "#ffffff",
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
