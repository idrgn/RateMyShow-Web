import axios from "axios";
import { useEffect, useState } from "react";
import TitleList from "../../components/title_list/TitleList";

const BestRated = () => {
	// Creamos estado para almacenar la respuesta
	const [searchResults, setSearchResults] = useState({ best: [] });

	// Obtención de datos
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/best`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setSearchResults(response.data);
			console.log(JSON.stringify(response.data));
		});
	}, []);

	return (
		<div>
			<div className="search-title">Mejor Valoradas</div>
			<div className="search-result">
				<TitleList titles={searchResults.best}></TitleList>
			</div>
		</div>
	);
};

export default BestRated;
