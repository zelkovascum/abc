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
	image?: {
		url: string;
	};
	address: string;
	allowPasswordChange: boolean;
	created_at: Date;
	updated_at: Date;
};

// 投稿
export type Post = {
	id: number;
	user: {
		id: number;
		name: string;
		email: string;
		image?: {
			url: string;
		};
	};
	lat: number;
	lng: number;
	place: string;
	dateTime: Date;
	content: string;
};

// export type OutputPost = {
// 	id: number;
// 	user: {
// 		id: number;
// 		name: string;
// 		email: string;
// 		image?: {
// 			url: string;
// 		};
// 	};
// 	lat: number;
// 	lng: number;
// 	place: string;
// 	dateTime: string;
// 	content: string;
// };

// 緯度経度
export type LatLng = {
	lat: number;
	lng: number;
};

// DM部屋
export type Room = {
	id: number;
	currentUser: User;
	otherUser: User;
	lastMessage: Message;
};

// メッセージ
export type Message = {
	id: number;
	content: string;
	image?: {
		url: string;
	};
	userId: number;
	// roomId: number;
};

export type Reaction = {
	fromUserId: number;
	toUserId: number;
};
