import { Dispatch, FC, memo, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
	prefectures: string;
	setPrefectures: Dispatch<SetStateAction<string>>;
};

export const SelectPrefectures: FC<Props> = memo((props) => {
	const { prefectures, setPrefectures } = props;

	return (
		<Autocomplete
			disablePortal
			options={prefecturesList}
			sx={{ width: 200 }}
			renderInput={(params) => <TextField {...params} label="都道府県" />}
			inputValue={prefectures}
			onInputChange={(e, newInputValue) => {
				setPrefectures(newInputValue);
			}}
		/>
	);
});

export const prefecturesList = [
	"北海道",
	"青森県",
	"岩手県",
	"宮城県",
	"秋田県",
	"山形県",
	"福島県",
	"茨城県",
	"栃木県",
	"群馬県",
	"埼玉県",
	"千葉県",
	"東京都",
	"神奈川県",
	"新潟県",
	"富山県",
	"石川県",
	"福井県",
	"山梨県",
	"長野県",
	"岐阜県",
	"静岡県",
	"愛知県",
	"三重県",
	"滋賀県",
	"京都府",
	"大阪府",
	"兵庫県",
	"奈良県",
	"和歌山県",
	"鳥取県",
	"島根県",
	"岡山県",
	"広島県",
	"山口県",
	"徳島県",
	"香川県",
	"愛媛県",
	"高知県",
	"福岡県",
	"佐賀県",
	"長崎県",
	"熊本県",
	"大分県",
	"宮崎県",
	"鹿児島県",
	"沖縄県",
];
