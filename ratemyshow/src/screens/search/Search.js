import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleList from "../../components/title_list/TitleList";
import "./Search.css";

const Search = () => {
	// Parámetros de URL
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(0);

	// Se almacenan los parámetros
	const search = searchParams.get("query");

	// Creamos estado para almacenar la respuesta
	const [searchResults, setSearchResults] = useState({ result: [] });

	// Actualizar página
	const updatePage = () => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles?query=${search}&page=${page}`).then((response) => {
			console.log(`http://api.ratemyshow.lekiam.net/titles?query=${search}&$page=${page}`);
			setSearchResults(response.data);
		});
	};

	// Actualizar página
	const onPageChange = (event, value) => {
		setPage(value - 1);
		updatePage();
	};

	// Pedimos los datos a la API
	useEffect(() => {
		updatePage();
	}, []);

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
