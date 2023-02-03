import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UserListItem from "../../components/user_list_item/UserListItem";
import "./Users.css";

const Users = (props) => {
	// Creamos estado para almacenar la lista de usuarios
	const [response, setResponse] = useState({ users: [] });
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users?query=${search}&page=${page}`).then((response) => {
			setResponse(response.data);
		});
	}, [page, search]);

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
			<div className="users-text">
				<h1>Usuarios</h1>
			</div>
			<div className="users-container">{response.users.map(userListToComponent)}</div>
			<div className="users-pagination">
				<Pagination count={response.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default Users;
