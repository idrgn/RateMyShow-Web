import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleListItem from "../../components/title_list_item/TitleListItem";
import "./Favorites.css";
/**
 * Lista de favoritos
 * @param {*} props
 * @returns
 */
const FavoritesList = (props) => {
	const params = useParams();
	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({ favorites: [] });

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/favorites`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
		});
	}, []);

	// Función para convertir lista de titulos a componente
	const titleListToComponent = (u) => {
		return <TitleListItem user={u} />;
	};

	return (
		<div>
			<div>
				<h1>Tus favoritos</h1>
			</div>
			<div>{response.favorites.map(titleListToComponent)}</div>
		</div>
	);
};
export default FavoritesList;
