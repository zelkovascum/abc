import { FC, memo, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { Header } from "components/organisms/Header";
import { Footer } from "components/organisms/Footer";
import { ReactionAlert } from "components/molucules/reactions/ReactionAlert";
import { ReactionNotificationContext } from "providers/ReactionNotificationProvider";

export const CommonLayout: FC = memo(() => {
	const { notificationState, notificationDispatch } = useContext(
		ReactionNotificationContext
	);

	return (
		<Box>
			<Header />
			<Grid container justifyContent="center" py={"64px"}>
				<Grid item>
					<Outlet />
					<ReactionAlert
						open={notificationState.isAlertMessageOpen}
						dispatch={notificationDispatch}
						severity="info"
						message={notificationState.message}
					/>
				</Grid>
			</Grid>
			<Footer />
		</Box>
	);
});
