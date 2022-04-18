// サインアップ
export type SignUpParams = {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

// サインイン
export type SignInParams = {
	email: string;
	password: string;
};

// ユーザー
export type User = {
	id: number;
	uid: string;
	provider: string;
	email: string;
	name: string;
	nickname?: string;
	image?: string;
	allowPasswordChange: boolean;
	created_at: Date;
	updated_at: Date;
};

// 投稿
export type Post = {
	content: string;
	created_at: number;
	date_time: number;
	id: number;
	lat: number;
	lng: number;
	place: string;
	updated_at: Date;
	user_id: number;
};

// 緯度経度
export type LatLng = {
	lat: number;
	lng: number;
};
