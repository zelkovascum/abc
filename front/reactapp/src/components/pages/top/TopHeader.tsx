import { FC, memo } from "react";
import { Grid, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const TopHeader: FC = memo(() => {
	return (
		<Grid container justifyContent="flex-end">
			<Grid item>
				<Link href="https://github.com/zelkovascum/Photudio">
					<GitHubIcon color="secondary" sx={{ m: 2 }} />
				</Link>
			</Grid>
		</Grid>
	);
});
