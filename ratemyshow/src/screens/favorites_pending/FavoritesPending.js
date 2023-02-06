import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./FavoritesPending.css";

/**
 * Lista de favoritos y pending
 * @param {*} props
 * @returns
 */
const FavoritesPending = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const action = props.favorites ? "favorites" : "pending";
	const title = props.favorites ? "Favoritos" : "Pendientes";

	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({});
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/${action}?page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
			setIsLoading(false);
		});
	}, [action, page]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value) {
			setPage(value);
		}
	};

	return (
		<div className="general-body">
			<div className="favoritespending-containertext">
				<div className="general-title">Tus {title}</div>
			</div>
			<div className="favoritespending-titlelist">{props.favorites ? isLoading ? <Loading /> : <TitleList titles={response.favorites ? response.favorites : []}></TitleList> : isLoading ? <Loading /> : <TitleList titles={response.pending ? response.pending : []}></TitleList>}</div>
			<div className="favoritespending-pagination">
				<Pagination count={response.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default FavoritesPending;
