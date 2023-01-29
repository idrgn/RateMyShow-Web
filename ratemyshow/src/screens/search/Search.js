import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleList from "../../components/title_list/TitleList";
import "./Search.css";

const Search = () => {
	// Parámetros de URL
	const [searchParams, setSearchParams] = useSearchParams();

	// Se almacenan los parámetros
	const search = searchParams.get("query");
	let page = searchParams.get("page");

	// Si la página no está definida, es 0
	if (page === undefined) page = 0;

	// Creamos estado para almacenar la respuesta
	const [searchResults, setSearchResults] = useState({ result: [] });

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles?query=${search}&$page={page}`).then((response) => {
			console.log(`http://api.ratemyshow.lekiam.net/titles?query=${search}`);
			setSearchResults(response.data);
		});
	}, [search, searchParams.query]);

	return (
		<div>
			<div className="search-title">Resultados de la búsqueda "{search}"</div>
			<div className="search-result">
				<TitleList titles={searchResults.result}></TitleList>
			</div>
		</div>
	);
};

export default Search;
