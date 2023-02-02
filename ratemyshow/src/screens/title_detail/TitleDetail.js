import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { AppBar, Box, IconButton, Paper, Rating, TextField, Typography, Button, CircularProgress } from "@mui/material";
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

	// Estado de los títulos
	const [isFavorite, setIsFavorite] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [isRated, setIsRated] = useState(false);

	// Estado de la carga
	const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
	const [isPendingLoading, setIsPendingLoading] = useState(false);
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
				<div className="titledetail-avatar-users">
					<span>{c.username}</span>
					<img src={`http://api.ratemyshow.lekiam.net/pfp/${c.avatarId}`} alt="foto de perfil"></img>
					<div>{new Date(Date.parse(c.addedDate)).toLocaleDateString("es-ES")}</div>
				</div>
				<div className="titledetail-comment">{c.comment}</div>

				<div className="titledetail-rating-number">
					<Rating defaultValue={c.rating} precision={0.5} readOnly size="medium" className="titledetail-rating" />
					<div>{c.rating.toFixed(1)}</div>
					<p></p>
				</div>
			</div>
		);
	};

	const handleRating = (e) => {
		e.preventDefault();
		const comment = commentRef.current.value;
		axios.put(`http://api.ratemyshow.lekiam.net/titles/${params.id}/rating`, { rating: rating, comment: comment }, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setIsRated(true);
		});
	};

	// Añadir / eliminar favoritos
	const handleFavorite = () => {
		setIsFavoriteLoading(true);
		if (isFavorite) {
			axios
				.delete(`http://api.ratemyshow.lekiam.net/titles/${params.id}/favorite`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFavorite(false);
				})
				.finally(setIsFavoriteLoading(false));
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/titles/${params.id}/favorite`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFavorite(true);
				})
				.finally(setIsFavoriteLoading(false));
		}
	};

	// Añadir, eliminar pendientes
	const handlePending = () => {
		setIsPendingLoading(true);
		if (isPending) {
			axios
				.delete(`http://api.ratemyshow.lekiam.net/titles/${params.id}/pending`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsPending(false);
				})
				.finally(setIsPendingLoading(false));
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/titles/${params.id}/pending`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsPending(true);
				})
				.finally(setIsPendingLoading(false));
		}
	};

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles/${params.id}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setTitleData(response.data);
			console.log(JSON.stringify(response.data));
			setIsLoading(false);
			setIsFavorite(response.data.isFavorite);
			setIsPending(response.data.isPending);
			setIsRated(response.data.isRated);
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

					<IconButton onClick={handleFavorite}>{isFavoriteLoading ? <CircularProgress size={30} /> : <FavoriteIcon htmlColor={isFavorite ? "red" : "grey"} fontSize="large"></FavoriteIcon>}</IconButton>

					<IconButton onClick={handlePending}>{isPendingLoading ? <CircularProgress size={30} /> : <AddToQueueIcon htmlColor={isPending ? "blue" : "grey"} fontSize="large" />}</IconButton>

					<IconButton>{isRated ? <StarIcon fontSize="large" htmlColor="gold"></StarIcon> : <StarIcon fontSize="large"></StarIcon>}</IconButton>
				</Paper>
			</div>
			<div id="sinopsis" className="titledetail-description">
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h4">Sinopsis: </Typography>
					<Typography variant="h6">{titleData.description}</Typography>
				</Paper>
			</div>
			<div className="titledetail-post-comment" hidden={isRated}>
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
						<Button onClick={handleRating}>Enviar</Button>
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
