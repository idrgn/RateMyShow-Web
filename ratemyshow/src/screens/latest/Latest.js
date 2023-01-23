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
		axios.get(`https://0ee0ee41-ff72-4ce8-a306-41b3a57f8eb0.mock.pstmn.io/latest`).then((response) => {
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
				<h1 className="textLatest">Últimas Series</h1>
			</div>

			<div className="latestList">{seriesSorted.map(latestToComponent)}</div>
			<div>
				<h1 className="textLatest">Últimas Películas</h1>
			</div>
			<div className="latestList">{moviesSorted.map(latestToComponent)}</div>
		</div>
	);
};

export default Latest;
