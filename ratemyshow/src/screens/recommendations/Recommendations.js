import axios from "axios";
import { useEffect, useState } from "react";
import RecommendationList from "../../components/recommendation_list/RecommendationList";
import "./Recommendations.css";

/**
 * Pantalla de recomendaciones de títilos
 * @param {*} props
 * @returns
 */
const Recommendations = (props) => {
	// Creamos estado para almacenar la lista de seguidores
	const [recommendations, setRecommendations] = useState([]);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`https://0ee0ee41-ff72-4ce8-a306-41b3a57f8eb0.mock.pstmn.io/recommendations`).then((response) => {
			setRecommendations(response.data);
		});
	}, []);

	// Función para convertir seguidor a componente
	const recommendationsToComponent = (r) => {
		return <RecommendationList recommendations={r} />;
	};

	return (
		<div className="recommendations">
			<div className="recommendations-text">
				<h1>Género</h1>
			</div>
			<div className="containerRecommendations">{recommendations.map(recommendationsToComponent)}</div>
		</div>
	);
};

export default Recommendations;
