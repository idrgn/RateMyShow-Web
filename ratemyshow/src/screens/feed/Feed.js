import { Pagination, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Feed.css";
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
		return (
			<div className="feed-container">
				<div className="feed-img">
					<img src={`http://api.ratemyshow.lekiam.net/pfp/${i.user.avatarId}`} alt="foto de perfil"></img>
				</div>

				<div className="feed-container-text">
					<div className="feed-nameuser">{i.user.username}</div>
					<div className="feed-title">{i.primaryTitle}</div>
					<div className="feed-rating">
						<Rating name="half-rating" readOnly defaultValue={i.rating} precision={0.5} size="large" />
					</div>
					<div>{i.addeddate}</div>
				</div>
			</div>
		);
	};

	return (
		<div className="feed-main-container">
			<div>
				<h1 className="feed-text">Feed</h1>
			</div>
			<div> {response.feed.map(feedItemComponent)}</div>
			<div className="feed-pagination" color="primary" size="large">
				<Pagination count={response.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};
export default FeedList;
