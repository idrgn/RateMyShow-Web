import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleList from "../../components/title_list/TitleList";
import TitleListItem from "../../components/title_list_item/TitleListItem";
import "./Favorites.css";
/**
 * Lista de favoritos
 * @param {*} props
 * @returns
 */
const FavoritesList = (props) => {
	const params = useParams();
	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({ favorites: [] });
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/favorites?page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
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
		<div>
			<div>
				<h1 className="favorites-text">Tus favoritos</h1>
			</div>
			<div>
				<TitleList titles={response.favorites}></TitleList>
			</div>
			<div className="favorites-pagination" color="primary" size="large">
				<Pagination count={response.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};
export default FavoritesList;
