import { Grid, Pagination, Paper, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleListItem from "../../components/title_list_item/TitleListItem";
import "./Ratings.css";

const Ratings = (props) => {
	const params = useParams();

	// Creamos estado para almacenar la lista de ratings
	const [response, setResponse] = useState({ ratings: [] });
	const [page, setPage] = useState(1);

	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}/ratings?page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setResponse(response.data);
		});
	}, [page, params.username]);

	// Actualizar página
	const onPageChange = (event, value) => {
		// Solo se actualiza si el valor cambia
		if (page !== value) {
			setPage(value);
		}
	};

	const ratingToComponent = (r) => {
		return (
			<Grid item className="ratings-flex">
				<div>
					<TitleListItem title={r}></TitleListItem>
				</div>
				<Paper variant="outlined" className="ratings-paper" sx={{ maxWidth: 200 }}>
					<Typography className="ratings-number" variant="h2">
						{r.rating.toFixed(1)}
					</Typography>
					<Rating name="rating" readOnly htmlColor="gold" defaultValue={r.rating} precision={0.5} size="large"></Rating>
					<Paper variant="outlined" className="ratings-comment">
						<Typography paragraph variant="h6" className="ratings-comment-text" sx={{ WebkitLineClamp: 8, overflow: "scroll", WebkitAlignContent: "center", display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
							{r.comment}
						</Typography>
					</Paper>
					<Typography>{r.ratingDate}</Typography>
				</Paper>
			</Grid>
		);
	};

	return (
		<div className="general-body">
			<div className="general-title">Valoraciones de {params.username}</div>
			<Grid spacing={8} justifyContent="center" container className="ratings-titles-container">
				{response.ratings.map(ratingToComponent)}
			</Grid>
			<div>
				<Pagination count={response.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default Ratings;
