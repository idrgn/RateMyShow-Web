import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleListItem from "../../components/title_list_item/TitleListItem";

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

	// Función para transformar títulos a componente.
	const titleToComponent = (t) => {
		return <TitleListItem title={t} />;
	};

	return (
		<div>
			<div>{searchResults.result.map(titleToComponent)}</div>
		</div>
	);
};

export default Search;
