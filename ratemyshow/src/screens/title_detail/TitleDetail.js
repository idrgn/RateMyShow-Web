import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { AppBar, Box, IconButton, Paper, Rating, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TitleDetail.css";

const TitleDetail = (props) => {
	const params = useParams();

	const [titleData, setTitleData] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles/${params.id}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setTitleData(response.data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) return <div></div>;

	return (
		<div className="titledetail-container">
			<div id="titulo" className="titulo">
				<Typography variant="h1">{titleData.primaryTitle}</Typography>
			</div>

			<div id="datos" className="datos">
				<Paper variant="outlined" className="titledetail-paper">
					<Box
						className="titledetail-paper"
						component="img"
						sx={{
							height: 600,
							width: 400,
							padding: 1,
						}}
						alt="Title cover."
						src={titleData.cover}
					></Box>
				</Paper>

				<Paper
					variant="outlined"
					className="titledetail-paper titledetail-info"
					sx={{
						height: 600,
						width: 800,
						padding: 1,
					}}
				>
					<Box>
						<Typography variant="h3">Título original: {titleData.originalTitle}</Typography>
						<Typography variant="h3">Director:</Typography>
						<Typography variant="h3">Guionista:</Typography>
						<Typography variant="h3">Género:</Typography>
						<Typography variant="h3">Reparto:</Typography>
						<Typography variant="h3">Año: {titleData.startYear}</Typography>
						<Typography variant="h3">Duración: {titleData.length}</Typography>
						<Typography variant="h3">Idioma: {titleData.language}</Typography>
					</Box>
				</Paper>
			</div>

			<div className="titledetail-rating-buttons">
				<Paper variant="outlined" className="titledetail-paper test">
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
					<Typography variant="h3">Sinopsis</Typography>
					<Typography variant="h4">{titleData.description}</Typography>
				</Paper>
			</div>
			<div className="comentar">
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h3">Escribe un comentario</Typography>
					<TextField></TextField>
				</Paper>
			</div>
			<div id="comentarios" className="comments">
				<Paper variant="outlined" className="titledetail-paper titledetail-description-text">
					<Typography variant="h3">Otros comentarios</Typography>
					<Typography>aaaa</Typography>
					<Typography>bbb</Typography>
				</Paper>
			</div>
		</div>
	);
};

export default TitleDetail;
