import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleListItem from "../../components/title_list_item/TitleListItem";

const Ratings = (props) => {
	const params = useParams();

	// Creamos estado para almacenar la lista de titulos
	const [response, setResponse] = useState({ ratings: [] });
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}/ratings?page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
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

	const ratingToComponent = (r) => {
		return (
			<div>
				<div>
					<TitleListItem title={r}></TitleListItem>
				</div>
				<div>
					<p>{r.rating}</p>
					<p>{r.comment}</p>
					<p>{r.ratingDate}</p>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div>
				<h1>Valoraciones de {params.username}</h1>
			</div>
			<div>{response.ratings.map(ratingToComponent)}</div>
			<div>
				<Pagination count={response.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default Ratings;
