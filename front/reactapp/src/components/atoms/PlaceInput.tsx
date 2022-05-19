import { FC, memo, useRef, ChangeEvent } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import "../../App.css";

type Props = {
	placeInputValue: any;
	setPlaceInputValue: any;
};

export const PlaceInput: FC<Props> = memo((props) => {
	const { placeInputValue, setPlaceInputValue } = props;
	const autocompleteRef = useRef<any>(null);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPlaceInputValue(e.target.value);
		console.log(placeInputValue);
	};

	const onLoad = (autocomplete: any) => {
		autocompleteRef.current = autocomplete;
	};

	const onPlaceChanged = () => {
		if (autocompleteRef !== null) {
			setPlaceInputValue(autocompleteRef.current.getPlace().formatted_address);
			console.log(autocompleteRef.current.getPlace().formatted_address);
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	};

	return (
		<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
			<TextField
				value={placeInputValue}
				onChange={(e) => handleChange(e)}
				type="text"
				placeholder=""
				sx={{ width: "100%" }}
			/>
		</Autocomplete>
	);
});

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
