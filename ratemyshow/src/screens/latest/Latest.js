import axios from "axios";
import { useEffect, useState } from "react";

import TitleList from "../../components/title_list/TitleList";

/**
 * Pantalla que muestra los últimos títulos
 * @param {*} props
 * @returns
 */
const Latest = (props) => {
	// Creamos estado para almacenar la lista de títulos
	const [latest, setLatest] = useState({
		movies: {
			result: [],
		},
		series: {
			result: [],
		},
	});

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/latest`).then((response) => {
			setLatest(response.data);
		});
	}, []);

	// Filtrar las películas
	const movies = latest.movies.result;

	// Filtrar las series
	const series = latest.series.result;

	return (
		<div>
			<div>
				<h1 style={{ textAlign: "center", fontSize: "50px" }}>Últimas Series</h1>
			</div>

			<div>
				<TitleList titles={series}></TitleList>
			</div>
			<div>
				<h1 style={{ textAlign: "center", fontSize: "50px" }}>Últimas Películas</h1>
			</div>
			<div>
				<TitleList titles={movies}></TitleList>
			</div>
		</div>
	);
};

export default Latest;
