import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserListItem from "../../components/user_list_item/UserListItem";
import "./followers.css";

/**
 * Lista de seguidores
 * @param {*} props
 * @returns
 */
const FollowerList = (props) => {
	const params = useParams();

	// Creamos estado para almacenar la lista de seguidores
	const [followers, setFollowers] = useState([]);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`https://0ee0ee41-ff72-4ce8-a306-41b3a57f8eb0.mock.pstmn.io/users/${params.username}/followers`).then((response) => {
			setFollowers(response.data);
		});
	}, []);

	// Función para convertir seguidor a componente
	const followerToComponent = (u) => {
		return <UserListItem user={u} />;
	};

	return (
		<div>
			<div className="textFollowers">
				<h1>Seguidores</h1>
			</div>
			<div className="containerFollowers">{followers.map(followerToComponent)}</div>
		</div>
	);
};

export default FollowerList;
