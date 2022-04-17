import { Container, Grid } from "@mui/material";
import { FC, memo, ReactElement } from "react";
import { Header } from "../molucules/Header";

type Props = {
	children: ReactElement;
};

// 全てのページで共通となるレイアウト
export const CommonLayout: FC<Props> = memo(({ children }) => {
	return (
		<>
			<header>
				<Header />
			</header>
			<main>
				<Container maxWidth="lg">
					<Grid container justifyContent="center">
						<Grid item xs={9}>
							{children}
						</Grid>
					</Grid>
				</Container>
			</main>
		</>
	);
});
