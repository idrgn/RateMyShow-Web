import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./Latest.css";

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

	const [isLoading, setIsLoading] = useState(true);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/latest`).then((response) => {
			setLatest(response.data);
			setIsLoading(false);
		});
	}, []);

	// Filtrar las películas
	const movies = latest.movies.result;

	// Filtrar las series
	const series = latest.series.result;

	return (
		<div className="general-body">
			<div className="general-title">Últimas Series</div>
			<div className="latest-list">{isLoading ? <Loading /> : <TitleList titles={series}></TitleList>}</div>
			<div className="general-title">Últimas Películas</div>
			<div className="latest-list">{isLoading ? <Loading /> : <TitleList titles={movies}></TitleList>}</div>
		</div>
	);
};

export default Latest;
