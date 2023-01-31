import axios from "axios";
import { useEffect, useState } from "react";
import LatestList from "../../components/latest/LatestList";
import "./Latest.css";

/**
 * Pantalla que muestra los últimos títulos
 * @param {*} props
 * @returns
 */
const Latest = (props) => {
	// Creamos estado para almacenar la lista de títulos
	const [latest, setLatest] = useState([]);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`https://api.ratemyshow.lekiam.net/latest`).then((response) => {
			setLatest(response.data);
		});
	}, []);

	// Función para convertir título a componente
	const latestToComponent = (l) => {
		return <LatestList latest={l} />;
	};

	// Filtrar las películas
	const movies = latest.filter((item) => item.titleType.name === "Movie" || item.titleType.name === "tvMovie");

	// Filtrar las series
	const series = latest.filter((item) => item.titleType.name === "Serie" || item.titleType.name === "tvSerie");

	// Ordenar por año de las películas
	const moviesSorted = movies.sort((a, b) => b.year - a.year).slice(0, 5);

	// Ordenar por año de las series
	const seriesSorted = series.sort((a, b) => b.year - a.year).slice(0, 5);

	return (
		<div className="latest">
			<div>
				<h1 className="latest-text">Últimas Series</h1>
			</div>

			<div className="latest-list">{seriesSorted.map(latestToComponent)}</div>
			<div>
				<h1 className="latest-text">Últimas Películas</h1>
			</div>
			<div className="latest-list">{moviesSorted.map(latestToComponent)}</div>
		</div>
	);
};

export default Latest;
