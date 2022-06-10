import React, { FC, memo } from "react";
import { Button } from "@mui/material";
import axios from "axios";
// import fileDownload from 'js-file-download'

type Props = {
	imageUrl: string;
};

export const DownloadButton: FC<Props> = memo((props) => {
	const { imageUrl } = props;

	return (
		<Button
		// onClick={() =>
		// 	handleClick(
		// 		"https://avatars.githubusercontent.com/u/9919?s=280&v=4",
		// 		"sample"
		// 	)
		// }
		>
			保存
		</Button>
	);
});
