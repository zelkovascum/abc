import { FC, memo, SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const HomeTabs: FC = memo(() => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", mb: 1 }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab
						label="最新の募集"
						{...a11yProps(0)}
						onClick={() => {
							navigate("/");
						}}
						sx={{ width: "50%" }}
					/>
					<Tab
						label="付近の募集"
						{...a11yProps(1)}
						onClick={() => {
							navigate("/near");
						}}
						sx={{ width: "50%" }}
					/>
				</Tabs>
			</Box>
		</Box>
	);
});
