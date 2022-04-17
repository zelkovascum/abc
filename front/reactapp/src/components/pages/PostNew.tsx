import { FC, memo } from "react";
import { Button, Card, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { SearchPlace } from "components/molucules/SearchPlace";
import { MaterialUIPickers } from "components/molucules/MaterialUIPickers";

export const PostNew: FC = memo(() => {
	return (
		<form>
			<Card sx={{ textAlign: "center" }}>
				<Container>
					<Box width={300} mt={1} mb={2}>
						<SearchPlace />
					</Box>
					<Box width={300} mb={2}>
						<MaterialUIPickers />
					</Box>
					<Box width={300} mb={2}>
						<TextField sx={{ width: "100%" }} label="コメント" />
					</Box>
					<Box>
						<Button variant="contained" component="span">
							投稿
						</Button>
					</Box>
				</Container>
			</Card>
		</form>
	);
});
