import { Pagination, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UserListItem from "../../components/user_list_item/UserListItem";
import "./Users.css";

const Users = (props) => {
	// Creamos estado para almacenar la lista de usuarios
	const [response, setResponse] = useState({ users: [] });
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users?query=${search}&page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
		});
	}, [page, search]);

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

	// Cuando se pulsa enter
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			setSearch(e.target.value);
			setPage(1);
		}
	};

	return (
		<div className="users">
			<div className="general-title">{search === "" ? "Usuarios de RateMyShow" : `Resultados de la búsqueda "${search}"`}</div>
			<div className="users-search">
				<TextField label="Busca un usuario" onKeyDown={handleKeyDown} sx={{ width: "50%" }}></TextField>
			</div>
			<div className="users-container">{response.users.map(userListToComponent)}</div>
			<div className="users-pagination">
				<Pagination count={response.pages} onChange={onPageChange} page={page} color="primary" size="large" />
			</div>
		</div>
	);
};

export default Users;
