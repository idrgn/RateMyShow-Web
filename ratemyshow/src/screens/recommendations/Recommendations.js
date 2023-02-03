import axios from "axios";
import { useEffect, useState } from "react";
import TitleList from "../../components/title_list/TitleList";
import "./Recommendations.css";
import Loading from "../../components/loading/Loading";

/**
 * Pantalla de recomendaciones de títilos
 * @param {*} props
 * @returns
 */
const Recommendations = (props) => {
	// Creamos estado para almacenar la lista de seguidores
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/recommendations`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setRecommendations(response.data);
			setIsLoading(false);
		});
	}, []);

	// Función para convertir seguidor a componente
	const recommendationsToComponent = (r) => {
		return (
			<div>
				<div className="recommendations-genre">{r.genre}</div>
				<TitleList titles={r.titles}></TitleList>
			</div>
		);
	};

	return (
		<div className="recommendations">
			<div className="recommendations-text">
				<h1>Recomendaciones</h1>
			</div>
			<div> {isLoading ? <Loading /> : recommendations.map(recommendationsToComponent)}</div>
		</div>
	);
};

export default Recommendations;
