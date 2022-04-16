import { Container, Grid } from "@mui/material";
import { ReactElement } from "react";
import { Header } from "../molucules/Header";

type Props = {
	children: ReactElement;
};

// 全てのページで共通となるレイアウト
export const CommonLayout = ({ children }: Props) => {
	return (
		<>
			<header>
				<Header />
			</header>
			<main>
				<Container maxWidth="lg">
					<Grid container>
						<Grid item>{children}</Grid>
					</Grid>
				</Container>
			</main>
		</>
	);
};
