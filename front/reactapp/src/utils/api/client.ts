import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ
// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
	ignoreHeaders: true,
};

export const client = applyCaseMiddleware(
	axios.create({
		baseURL: `${process.env.REACT_APP_SERVER_URL}`,
	}),
	options
);

export const imageClient = applyCaseMiddleware(
	axios.create({
		baseURL: `${process.env.REACT_APP_SERVER_URL}`,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	}),
	{
		ignoreHeaders: true,
	}
);
