import { Pagination } from "@mui/material";
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
	const [response, setResponse] = useState({ followers: [], following: [] });
	const [page, setPage] = useState(0);
	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}/${action}?page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
		});
	}, [page]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value - 1) {
			setPage(value - 1);
		}
	};
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
			<div className="followers-container">{props.following ? response.following.map(userListToComponent) : response.followers.map(userListToComponent)}</div>
			<div className="followers-pagination" color="primary" size="large">
				<Pagination count={response.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};

export default FollowerList;
