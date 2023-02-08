import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Box, IconButton, Paper, Rating, TextField, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import "./TitleDetail.css";
import Loading from "../../components/loading/Loading";

/**
 * Pantalla de detalles de un título
 * @param {*} props
 * @returns
 */
const TitleDetail = (props) => {
	// Timers para las peticiones
	let favoriteTimer = null;
	let pendingTimer = null;

	const params = useParams();
	const commentRef = useRef(null);
	const [titleData, setTitleData] = useState({ crew: [], lastComments: [] });
	const [isLoading, setIsLoading] = useState(true);
	const [rating, setRating] = useState(-1);
	const [page, setPage] = useState(0);
	const [moreComments, setMoreComments] = useState([]);
	const [buttonDisabled, setbuttonDisabled] = useState(false);

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

	//filtra los miembros del equipo según su trabajo (actor o actriz)
	const actors = titleData.crew
		.filter((participant) => participant.job === "actor" || participant.job === "actress")
		.map((participant) => participant.name)
		.join(", ");

	//filtra los miembros del equipo según su trabajo (writer)
	const writer = titleData.crew
		.filter((participant) => participant.job === "writer")
		.map((participant) => participant.name)
		.join(", ");

	//filtra los miembros del equipo según su trabajo (director)
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

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
				.finally(() => {
					clearTimeout(favoriteTimer);
					setIsFavoriteLoading(false);
				});
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/titles/${params.id}/favorite`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFavorite(true);
				})
				.finally(() => {
					clearTimeout(favoriteTimer);
					setIsFavoriteLoading(false);
				});
		}

		// Se muestra el timer si la petición tarda mas de 1 segundo
		favoriteTimer = setTimeout(() => {
			setIsFavoriteLoading(true);
		}, 1000);
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
				.finally(() => {
					clearTimeout(pendingTimer);
					setIsPendingLoading(false);
				});
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/titles/${params.id}/pending`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsPending(true);
				})
				.finally(() => {
					clearTimeout(pendingTimer);
					setIsPendingLoading(false);
				});
		}

		// Se muestra el timer si la petición tarda mas de 1 segundo
		pendingTimer = setTimeout(() => {
			setIsPendingLoading(true);
		}, 1000);
	};

	const loadMoreComments = () => {
		setbuttonDisabled(true);
		axios
			.get(`http://api.ratemyshow.lekiam.net/titles/${params.id}/ratings?page=${page}`)
			.then((response) => {
				let currentPage = response.data.current + 1 === response.data.pages ? -1 : response.data.current + 1;
				setMoreComments(moreComments.concat(response.data.ratings));
				setPage(currentPage);
			})
			.finally(() => {
				setbuttonDisabled(false);
			});
	};

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles/${params.id}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setTitleData(response.data);
			setIsLoading(false);
			setIsFavorite(response.data.isFavorite);
			setIsPending(response.data.isPending);
			setIsRated(response.data.isRated);
		});
	}, [params.id, isRated]);

	if (isLoading)
		return (
			<div>
				<Loading></Loading>
			</div>
		);

	return (
		<div className="titledetail-container">
			<div className="general-title">{titleData.translatedTitle ? titleData.translatedTitle : titleData.primaryTitle}</div>

			<div className="titledetail-data-cover">
				<Paper variant="outlined" className="titledetail-paper titledetail-image-container">
					<Box className="titledetail-paper titledetail-image" component="img" alt="Title cover." src={titleData.cover ? titleData.cover : "http://api.ratemyshow.lekiam.net/img/cover"}></Box>
				</Paper>

				<Paper
					variant="outlined"
					className="titledetail-paper titledetail-info"
					sx={{
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
							<span>Género(s): </span>
							{titleData.genres.map((genre) => capitalizeFirstLetter(genre)).join(", ")}
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
							{languageMapping[titleData.language] || titleData.language || "Sin datos"}
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
								padding: "20px",
							}}
							readOnly
							size="large"
						/>
					)}

					<Typography variant="h6" color="grey" padding="20px">
						{titleData.rating ? `${titleData.rating.toFixed(1)} (${titleData.totalRatings} ${titleData.totalRatings > 1 ? "valoraciones" : "valoración"})` : "SIN VALORACIONES"}
					</Typography>
					<div className="titledetail-totalbuttons">
						<IconButton onClick={handleFavorite} disabled={!localStorage.getItem("sessionToken")}>
							{isFavoriteLoading ? <CircularProgress size={30} /> : <FavoriteIcon htmlColor={isFavorite ? "red" : "grey"} fontSize="large"></FavoriteIcon>}
						</IconButton>

						<IconButton onClick={handlePending} disabled={!localStorage.getItem("sessionToken")}>
							{isPendingLoading ? <CircularProgress size={30} /> : <AddToQueueIcon htmlColor={isPending ? "blue" : "grey"} fontSize="large" />}
						</IconButton>

						<IconButton disabled={!localStorage.getItem("sessionToken")}>{isRated ? <StarIcon fontSize="large" htmlColor="gold"></StarIcon> : <StarIcon fontSize="large"></StarIcon>}</IconButton>
					</div>
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
						<AwesomeButton onPress={handleRating} disabled={rating === -1 || commentRef.current.value === "" || !localStorage.getItem("sessionToken")}>
							Enviar
						</AwesomeButton>
					</div>
				</Paper>
			</div>

			<div className="titledetail-post-comment" hidden={!isRated}>
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h4">Tu valoración y comentario:</Typography>
					<div>{titleData.ownRating ? commentToComponent(titleData.ownRating) : undefined}</div>
				</Paper>
			</div>

			<div className="titledetail-comments" hidden={titleData.lastComments.length === 0}>
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h4">{titleData.lastComments.length === 0 ? "Sin comentarios" : "Otros comentarios"}</Typography>
					<Typography>{moreComments.length > 0 ? moreComments.map(commentToComponent) : titleData.lastComments.map(commentToComponent)}</Typography>
					<div hidden={titleData.lastComments.length < 5}>
						<AwesomeButton type="primary" className="titledetail-button" onPress={loadMoreComments} disabled={page === -1 || buttonDisabled}>
							Cargar más comentarios
						</AwesomeButton>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default TitleDetail;
