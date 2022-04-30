// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";
// import throttle from "lodash/throttle";

// function loadScript(src: string, position: HTMLElement | null, id: string) {
// 	if (!position) {
// 		return;
// 	}

// 	const script = document.createElement("script");
// 	script.setAttribute("async", "");
// 	script.setAttribute("id", id);
// 	script.src = src;
// 	position.appendChild(script);
// }

// const autocompleteService = { current: null };

// interface MainTextMatchedSubstrings {
// 	offset: number;
// 	length: number;
// }
// interface StructuredFormatting {
// 	main_text: string;
// 	secondary_text: string;
// 	main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
// }
// interface PlaceType {
// 	description: string;
// 	structured_formatting: StructuredFormatting;
// }
// type Props = {
// 	placeInputValue: string;
// 	setPlaceInputValue: React.Dispatch<React.SetStateAction<string>>;
// };

// export const PlaceInput: React.FC<Props> = React.memo((props) => {
// 	const { placeInputValue, setPlaceInputValue } = props;
// 	const [value, setValue] = React.useState<PlaceType | null>(null);
// 	const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
// 	const loaded = React.useRef(false);

// 	if (typeof window !== "undefined" && !loaded.current) {
// 		if (!document.querySelector("#google-maps")) {
// 			loadScript(
// 				`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
// 				document.querySelector("head"),
// 				"google-maps"
// 			);
// 		}

// 		loaded.current = true;
// 	}

// 	const fetch = React.useMemo(
// 		() =>
// 			throttle(
// 				(
// 					request: { input: string },
// 					callback: (results?: readonly PlaceType[]) => void
// 				) => {
// 					(autocompleteService.current as any).getPlacePredictions(
// 						request,
// 						callback
// 					);
// 				},
// 				200
// 			),
// 		[]
// 	);

// 	React.useEffect(() => {
// 		let active = true;

// 		if (!autocompleteService.current && (window as any).google) {
// 			autocompleteService.current = new (
// 				window as any
// 			).google.maps.places.AutocompleteService();
// 		}
// 		if (!autocompleteService.current) {
// 			return undefined;
// 		}

// 		if (placeInputValue === "") {
// 			setOptions(value ? [value] : []);
// 			return undefined;
// 		}

// 		fetch({ input: placeInputValue }, (results?: readonly PlaceType[]) => {
// 			if (active) {
// 				let newOptions: readonly PlaceType[] = [];

// 				if (value) {
// 					newOptions = [value];
// 				}

// 				if (results) {
// 					newOptions = [...newOptions, ...results];
// 				}

// 				setOptions(newOptions);
// 			}
// 		});

// 		return () => {
// 			active = false;
// 		};
// 	}, [value, placeInputValue, fetch]);

// 	return (
// 		<Autocomplete
// 			id="google-map-demo"
// 			sx={{ width: 300 }}
// 			getOptionLabel={(option) =>
// 				typeof option === "string" ? option : option.description
// 			}
// 			filterOptions={(x) => x}
// 			options={options}
// 			autoComplete
// 			includeInputInList
// 			filterSelectedOptions
// 			value={value}
// 			onChange={(event: any, newValue: PlaceType | null) => {
// 				setOptions(newValue ? [newValue, ...options] : options);
// 				setValue(newValue);
// 			}}
// 			onInputChange={(event, newInputValue) => {
// 				setPlaceInputValue(newInputValue);
// 			}}
// 			renderInput={(params) => (
// 				<TextField {...params} label="場所を追加" fullWidth />
// 			)}
// 			renderOption={(props, option) => {
// 				const matches =
// 					option.structured_formatting.main_text_matched_substrings;
// 				const parts = parse(
// 					option.structured_formatting.main_text,
// 					matches.map((match: any) => [
// 						match.offset,
// 						match.offset + match.length,
// 					])
// 				);

// 				return (
// 					<li {...props}>
// 						<Grid container alignItems="center">
// 							<Grid item>
// 								<Box
// 									component={LocationOnIcon}
// 									sx={{ color: "text.secondary", mr: 2 }}
// 								/>
// 							</Grid>
// 							<Grid item xs>
// 								{parts.map((part, index) => (
// 									<span
// 										key={index}
// 										style={{
// 											fontWeight: part.highlight ? 700 : 400,
// 										}}
// 									>
// 										{part.text}
// 									</span>
// 								))}
// 								<Typography variant="body2" color="text.secondary">
// 									{option.structured_formatting.secondary_text}
// 								</Typography>
// 							</Grid>
// 						</Grid>
// 					</li>
// 				);
// 			}}
// 		/>
// 	);
// });

import * as React from "react";
import { Autocomplete } from "@react-google-maps/api";

type Props = {
	placeInputValue: any;
	setPlaceInputValue: any;
};

export const PlaceInput: React.FC<Props> = React.memo((props) => {
	const { placeInputValue, setPlaceInputValue } = props;

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPlaceInputValue(e.target.value);
		console.log(placeInputValue);
	};
	const [autocomplete, setAutocomplete] = React.useState(null);

	const onLoad = () => {
		console.log("autocomplete: ", autocomplete);
	};

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			// console.log(autocomplete.getPlace());
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	};

	return (
		<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
			<input
				value={placeInputValue}
				onChange={(e) => handleChange(e)}
				placeholder="Customized your placeholder"
				style={{
					boxSizing: `border-box`,
					border: `1px solid transparent`,
					width: `240px`,
					height: `32px`,
					padding: `0 12px`,
					borderRadius: `3px`,
					boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
					fontSize: `14px`,
					outline: `none`,
					textOverflow: `ellipses`,
					position: "absolute",
					left: "50%",
					marginLeft: "-120px",
					marginBottom: "20px",
				}}
			/>
		</Autocomplete>
	);
});
