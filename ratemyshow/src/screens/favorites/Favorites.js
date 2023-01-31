import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleList from "../../components/title_list/TitleList";
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
		axios.get(`http://api.ratemyshow.lekiam.net/favorites`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
			console.log(JSON.stringify(response.data));
		});
	}, []);

	// Función para convertir lista de titulos a componente
	const titleListToComponent = (t) => {
		return <TitleListItem title={t} />;
	};

	return (
		<div>
			<div>
				<h1 className="favorites-text">Tus favoritos</h1>
			</div>
			<TitleList titles={response.favorites}></TitleList>
		</div>
	);
};
export default FavoritesList;
