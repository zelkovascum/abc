import { FC, memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailUser } from "utils/api/user";
import { UserCard } from "../../organisms/users/UserCard";

export const Profile: FC = memo(() => {
	const [user, setUser] = useState({
		id: 0,
		name: "",
		email: "",
		imageUrl: "",
	});
	const [roomId, setRoomId] = useState<number | undefined>();
	const navigate = useNavigate();
	const { id } = useParams();

	const handleGetDetailUser = async (id: string) => {
		try {
			const res = await getDetailUser(id);
			setUser({
				id: res.data.userInfo.id,
				name: res.data.userInfo.name,
				email: res.data.userInfo.email,
				imageUrl: res.data.userInfo.image.url,
			});
			setRoomId(res.data.roomId);
		} catch (e) {
			console.error(e);
		}
	};

	const handleGetDetailRoom = () => {
		navigate(`/rooms/${roomId}`);
	};

	useEffect(() => {
		handleGetDetailUser(id!);
	}, [id]);

	return (
		<UserCard
			imageUrl={user.imageUrl}
			name={user.name}
			handleGetDetailRoom={() => handleGetDetailRoom()}
			roomId={roomId}
		/>
	);
});
