import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { AppBar, Box, IconButton, Paper, Rating, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./TitleDetail.css";

const TitleDetail = (props) => {
	const params = useParams();
	const commentRef = useRef(null);
	const [titleData, setTitleData] = useState({ crew: [], lastComments: [] });
	const [isLoading, setIsLoading] = useState(true);
	const [rating, setRating] = useState(-1);
	const languageMapping = {
		en: "Inglés",
		fr: "Francés",
		es: "Español",
		ru: "Ruso",
		hi: "Hindi",
		xi: "Chino",
		zh: "Chino",
		bn: "Bengalí",
		id: "Indonés",
		ar: "Árabe",
	};

	const actors = titleData.crew
		.filter((participant) => participant.job === "actor" || participant.job === "actress")
		.map((participant) => participant.name)
		.join(", ");

	const writer = titleData.crew
		.filter((participant) => participant.job === "writer")
		.map((participant) => participant.name)
		.join(", ");

	const director = titleData.crew
		.filter((participant) => participant.job === "director")
		.map((participant) => participant.name)
		.join(", ");

	const commentToComponent = (c) => {
		return (
			<div className="titledetail-comments-users">
				<div>
					<span>Usuario: </span>
					{c.username}
				</div>
				<div>
					<span>Comentario: </span>
					{c.comment}
				</div>

				<div>
					<Rating defaultValue={c.rating} precision={0.5} readOnly size="medium" />
				</div>
			</div>
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const comment = commentRef.current.value;
		axios
			.put(`http://api.ratemyshow.lekiam.net/titles/${params.id}/rating`, { rating: rating, comment: comment }, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
			.then((response) => {
				alert(JSON.stringify(response));
			})
			.catch((error) => {
				alert(JSON.stringify(error));
			});
	};

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles/${params.id}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setTitleData(response.data);
			console.log(JSON.stringify(response.data));
			setIsLoading(false);
		});
	}, []);

	if (isLoading) return <div></div>;

	return (
		<div className="titledetail-container">
			<div id="titulo" className="titledetail-titulo">
				<Typography variant="h2">{titleData.primaryTitle}</Typography>
			</div>

			<div className="titledetail-data-cover">
				<Paper variant="outlined" className="titledetail-paper">
					<div
						style={{
							height: "52vh",
							width: "25vw",
							padding: 1,
						}}
					>
						<Box className="titledetail-paper" component="img" alt="Title cover." src={titleData.cover} sx={{ height: "100%", width: "100%" }}></Box>
					</div>
				</Paper>

				<Paper
					variant="outlined"
					className="titledetail-paper titledetail-info"
					sx={{
						height: "50vh",
						width: "39vw",
						padding: 1,
					}}
				>
					<Box className="titledetail-text">
						<Typography>
							<span>Título original: </span>
							{titleData.originalTitle}
						</Typography>
						<Typography>
							{
								(titleData.crew.job = "director" ? (
									<>
										<span>Director: </span>
										{director ? director : "Sin datos"}
									</>
								) : null)
							}
						</Typography>
						<Typography>
							{
								(titleData.crew.job = "writer" ? (
									<>
										<span>Guionistas: </span>
										{writer ? writer : "Sin datos"}
									</>
								) : null)
							}
						</Typography>
						<Typography>
							<span>Género: </span>
							{titleData.genres.join(", ")}
						</Typography>
						<Typography>
							{(titleData.crew.job = "actor") || (titleData.crew.job = "actress") ? (
								<>
									<span>Reparto: </span>
									{actors ? actors : "Sin datos"}
								</>
							) : null}
						</Typography>
						<Typography>
							<span>Año: </span>
							{titleData.startYear}
						</Typography>
						<Typography>
							<span>Duración: </span>
							{titleData.runtimeMinutes} minutos
						</Typography>
						<Typography>
							<span>Idioma: </span>
							{languageMapping[titleData.language] || titleData.language}
						</Typography>
					</Box>
				</Paper>
			</div>

			<div className="titledetail-rating-buttons">
				<Paper variant="outlined" className="titledetail-paper titledetail-buttons">
					{titleData.rating ? (
						<Rating defaultValue={titleData.rating} precision={0.5} readOnly size="large" />
					) : (
						<Rating
							defaultValue={5}
							sx={{
								color: "grey",
							}}
							readOnly
							size="large"
						/>
					)}
					<Typography variant="h5" color="grey">
						{titleData.rating ? titleData.rating : "SIN VALORACIONES"}
					</Typography>

					<Typography></Typography>
					<Typography></Typography>

					<IconButton>
						<FavoriteIcon fontSize="large"></FavoriteIcon>
					</IconButton>

					<IconButton>
						<AddToQueueIcon fontSize="large"></AddToQueueIcon>
					</IconButton>

					<IconButton>
						<StarIcon fontSize="large"></StarIcon>
					</IconButton>
				</Paper>
			</div>
			<div id="sinopsis" className="titledetail-description">
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h4">Sinopsis: </Typography>
					<Typography variant="h6">{titleData.description}</Typography>
				</Paper>
			</div>
			<div className="titledetail-post-comment">
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h4">Tu valoración y comentario:</Typography>
					<div className="titledetail-rate">
						<TextField inputRef={commentRef} multiline placeholder="Escribe tu comentario..." sx={{ width: "800px", padding: "3%" }}></TextField>
						<Rating
							name="half-rating"
							value={rating}
							precision={0.5}
							size="large"
							onChange={(_, value) => {
								setRating(value);
							}}
						/>
						<Button onClick={onSubmit}>Enviar</Button>
					</div>
				</Paper>
			</div>
			<div className="titledetail-comments">
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h4">Otros comentarios</Typography>
					<Typography>{titleData.lastComments.map(commentToComponent)}</Typography>
				</Paper>
			</div>
		</div>
	);
};

export default TitleDetail;
