import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleList from "../../components/title_list/TitleList";
import "./FavoritesPending.css";

/**
 * Lista de favoritos y pending
 * @param {*} props
 * @returns
 */
const FavoritesList = (props) => {
	const params = useParams();

	const action = props.favorites ? "favorites" : "pending";
	const title = props.favorites ? "Favoritos" : "Pendientes";

	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({ favorites: [], pending: [] });
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/${action}?page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
			console.log(JSON.stringify(response.data));
		});
	}, [page]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value - 1) {
			setPage(value - 1);
		}
	};

	return (
		<div className="favoritespending-container">
			<div className="favoritespending-containertext">
				<h1 className="favoritespending-text">Tus {title}</h1>
			</div>
			<div className="favoritespending-titlelist">{props.favorites ? <TitleList titles={response.favorites}></TitleList> : <TitleList titles={response.pending}></TitleList>}</div>
			<div className="favoritespending-pagination" color="primary" size="large">
				<Pagination count={response.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};

export default FavoritesList;
