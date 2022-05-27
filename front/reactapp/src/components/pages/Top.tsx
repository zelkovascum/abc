import { FC, memo } from "react";
import { Grid, Link, Typography } from "@mui/material";
import manImg from "images/man.jpg";
import mapImage from "images/map.jpg";
import timeImage from "images/time.jpg";

export const Top: FC = memo(() => {
	return (
		<Grid
			container
			direction="column"
			justifyContent="space-evenly"
			alignContent="center"
			sx={{ height: "100%", px: 5 }}
		>
			<Grid item>
				<Typography
					sx={{
						fontSize: { xs: 20, sm: 30 },
						fontWeight: "bold",
						color: "teal",
					}}
				>
					Concept
				</Typography>
				<Typography align="center" sx={{ fontSize: { xs: 15, sm: 25 } }}>
					”Photudio”は写真を撮ってくれる人を気軽に探すことができるサービスです。
				</Typography>
				<Typography align="center" sx={{ fontSize: { xs: 15, sm: 25 } }}>
					SNSを通した多くの人との出会いをサポートします。
				</Typography>
			</Grid>
			<Grid item>
				<Grid container justifyContent="space-evenly">
					<Grid
						item
						sx={{
							widows: imageStyle,
							height: imageStyle,
						}}
					>
						<img alt="map" src={mapImage} height="100%" width="100%" />
					</Grid>
					<Grid
						item
						sx={{
							widows: imageStyle,
							height: imageStyle,
						}}
					>
						<img alt="man" src={manImg} height="100%" width="100%" />
					</Grid>
					<Grid
						item
						sx={{
							widows: imageStyle,
							height: imageStyle,
						}}
					>
						<img alt="time" src={timeImage} height="100%" width="100%" />
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Typography
					sx={{
						fontSize: { xs: 20, sm: 30 },
						fontWeight: "bold",
						color: "teal",
					}}
				>
					How to use
				</Typography>
				<Link href="https://github.com/zelkovascum/Photudio#sns%E5%9E%8B%E3%83%9E%E3%83%83%E3%83%81%E3%83%B3%E3%82%B0%E3%82%A2%E3%83%97%E3%83%AA-photudio">
					<Typography align="center" color="black">
						使い方はこちら！
					</Typography>
				</Link>
			</Grid>
		</Grid>
	);
});

const imageStyle = {
	xs: "100px",
	sm: "120px",
	md: "140px",
};
