import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Lista de feed
 * @param {*} props
 * @returns
 */
const FeedList = (props) => {
	const params = useParams();

	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({ feed: [] });
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/feed?page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
			console.log(JSON.stringify(response.data));
		});
	}, [page]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value - 1) {
			setPage(value - 1);
		}
	};

	// Función para convertir lista de feed a componente
	const feedItemComponent = (i) => {
		return <div></div>;
	};

	return (
		<div>
			<div>
				<h1>Feed</h1>
			</div>
			<div> {response.feed.map(feedItemComponent)}</div>
			<div color="primary" size="large">
				<Pagination count={response.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};
export default FeedList;
