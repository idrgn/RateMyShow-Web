import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserListItem from "../../components/user_list_item/UserListItem";
import "./FollowersFollowing.css";
import Loading from "../../components/loading/Loading";

/**
 * Lista de usuarios
 * @param {*} props
 * @returns
 */
const FollowersFollowing = (props) => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const action = props.following ? "following" : "followers";
	const title = props.following ? "Seguidos" : "Seguidores";

	// Creamos estado para almacenar la lista de usuarios
	const [response, setResponse] = useState({ followers: [], following: [] });
	const [page, setPage] = useState(1);
	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}/${action}?page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
			setIsLoading(false);
		});
	}, [action, page, params.username]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value) {
			setPage(value);
		}
	};
	// Función para convertir lista de usuarios a componente
	const userListToComponent = (u) => {
		return <UserListItem user={u} />;
	};

	return (
		<div className="general-body">
			<div className="general-title">
				{title} de {params.username}
			</div>
			<div className="followers-container">{props.following ? isLoading ? <Loading /> : response.following.map(userListToComponent) : isLoading ? <Loading /> : response.followers.map(userListToComponent)}</div>
			<div className="followers-pagination">
				<Pagination count={response.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default FollowersFollowing;
