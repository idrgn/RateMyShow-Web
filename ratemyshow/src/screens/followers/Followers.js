import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserListItem from "../../components/user_list_item/UserListItem";
import "./Followers.css";

/**
 * Lista de usuarios
 * @param {*} props
 * @returns
 */
const FollowerList = (props) => {
	const params = useParams();

	const action = props.following ? "following" : "followers";
	const title = props.following ? "Seguidos" : "Seguidores";

	// Creamos estado para almacenar la lista de usuarios
	const [userList, setUserList] = useState({ followers: [] });

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}/${action}`).then((response) => {
			setUserList(response.data);
		});
	}, []);

	// Función para convertir lista de usuarios a componente
	const userListToComponent = (u) => {
		return <UserListItem user={u} />;
	};

	return (
		<div>
			<div className="followers-text">
				<h1>
					{title} de {params.username}
				</h1>
			</div>
			<div className="followers-container">{userList.followers.map(userListToComponent)}</div>
		</div>
	);
};

export default FollowerList;
