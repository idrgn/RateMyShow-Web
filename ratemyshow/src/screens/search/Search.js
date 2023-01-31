import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleList from "../../components/title_list/TitleList";
import "./Search.css";

const Search = () => {
	// Parámetros de URL
	const [searchParams, setSearchParams] = useSearchParams();

	// Página actual
	const [page, setPage] = useState(0);

	// Resultados almacenados por página
	const [stored, setStored] = useState({});

	// Se almacenan los parámetros
	const search = searchParams.get("query");

	// Creamos estado para almacenar la respuesta
	const [searchResults, setSearchResults] = useState({ result: [] });

	// Obtención de datos
	useEffect(() => {
		if (page in stored) {
			// Si los datos ya están almacenados, se cargan
			setSearchResults(stored[page]);
		} else {
			// Si no, pedimos los datos a la API
			axios.get(`http://api.ratemyshow.lekiam.net/titles?query=${search}&page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
				setSearchResults(response.data);
				const newStored = stored;
				newStored[page] = response.data;
				setStored(newStored);
			});
		}
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
			<div className="search-title">Resultados de la búsqueda "{search}"</div>
			<div className="search-result">
				<TitleList titles={searchResults.result}></TitleList>
			</div>
			<div className="search-pagination" color="primary" size="large">
				<Pagination count={searchResults.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};

export default Search;
