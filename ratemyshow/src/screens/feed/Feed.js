import { Pagination, Paper, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import "./Feed.css";

/**
 * Pantalla de feed, muestra actividad de los usuarios seguidos
 * @param {*} props
 * @returns
 */
const Feed = (props) => {
	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({ feed: [] });
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		axios.get(`http://api.ratemyshow.lekiam.net/feed?page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
			setIsLoading(false);
		});
	}, [page]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value) {
			setPage(value);
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
					<Link to={`/users/${i.user.username}`}>
						<div className="feed-nameuser">{i.user.username}</div>
					</Link>
					<Link to={`/titles/${i.id}`}>
						<div className="feed-title">{i.primaryTitle}</div>
					</Link>
					<div className="feed-rating">
						<Rating name="half-rating" readOnly defaultValue={i.rating} precision={0.5} size="large" />
					</div>
					<div>{new Date(Date.parse(i.addedDate)).toLocaleDateString("es-ES")}</div>

					<Paper variant="outlined" className="feed-comment-container">
						<Typography paragraph variant="h6" className="feed-comment-text" sx={{ WebkitLineClamp: 2, overflow: "scroll", WebkitAlignContent: "center", display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
							{i.comment}
						</Typography>
					</Paper>
				</div>
			</div>
		);
	};

	return (
		<div className="feed-main-container">
			<div className="general-title">Feed</div>
			<div hidden={response.feed.length === 0}> {isLoading ? <Loading /> : response.feed.map(feedItemComponent)}</div>
			<div hidden={!(response.feed.length === 0)} className="general-title">
				{isLoading ? <Loading /> : "Sigue a alguien para ver su actividad!"}
			</div>
			<div className="feed-pagination">
				<Pagination count={response.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};
export default Feed;
