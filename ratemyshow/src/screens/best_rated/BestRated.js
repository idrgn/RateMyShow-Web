import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import TitleList from "../../components/title_list/TitleList";
import "./BestRated.css";

const BestRated = () => {
	// Creamos estado para almacenar la respuesta
	const [bestRated, setBestRated] = useState({ result: [] });

	// Obtención de datos
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/best`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setBestRated(response.data);
		});
	}, []);

	return (
		<div className="bestrated-container">
			<div className="bestrated-title">
				<Typography variant="h2"> Títulos Mejor Valorados</Typography>
			</div>
			<div className="bestrated-result">
				<TitleList titles={bestRated.result}></TitleList>
			</div>
		</div>
	);
};

export default BestRated;
