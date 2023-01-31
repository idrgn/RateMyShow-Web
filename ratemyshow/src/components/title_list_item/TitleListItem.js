import IconButton from "@mui/material/IconButton";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const TitleListItem = (props) => {
	// Estado de los títulos
	const [isFavorite, setIsFavorite] = useState(props.title.isFavorite);
	const [isPending, setIsPending] = useState(props.title.isPending);

	// Estado de la carga
	const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
	const [isPendingLoading, setIsPendingLoading] = useState(false);

	const navigate = useNavigate();

	// Redirección al hacer click
	const hanldeRedirect = () => {
		navigate(`/titles/${props.title.id}`);
	};

	// Añadir / eliminar favoritos
	const handleFavorite = () => {
		setIsFavoriteLoading(true);
		if (isFavorite) {
			axios
				.delete(`http://api.ratemyshow.lekiam.net/titles/${props.title.id}/favorite`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFavorite(false);
				})
				.finally(setIsFavoriteLoading(false));
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/titles/${props.title.id}/favorite`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
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
				.delete(`http://api.ratemyshow.lekiam.net/titles/${props.title.id}/pending`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsPending(false);
				})
				.finally(setIsPendingLoading(false));
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/titles/${props.title.id}/pending`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsPending(true);
				})
				.finally(setIsPendingLoading(false));
		}
	};

	return (
		<Card sx={{ maxWidth: 200, maxHeight: 600 }} variant="outlined">
			<CardMedia sx={{ height: 300, width: 200, cursor: "pointer" }} image={props.title.cover} title="Title" onClick={hanldeRedirect} />
			<CardContent>
				<Typography noWrap gutterBottom variant="h6" sx={{ cursor: "pointer" }} onClick={hanldeRedirect}>
					{props.title.primaryTitle}
				</Typography>
				<Typography noWrap gutterBottom variant="subtitle1">
					{props.title.startYear}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites" onClick={handleFavorite} disabled={isFavorite === undefined}>
					{isFavoriteLoading ? <CircularProgress size={20} /> : <FavoriteIcon htmlColor={isFavorite ? "red" : "grey"} />}
				</IconButton>
				<IconButton aria-label="add to pending" onClick={handlePending} disabled={isFavorite === undefined}>
					{isPendingLoading ? <CircularProgress size={20} /> : <AddToQueueIcon htmlColor={isPending ? "blue" : "grey"} />}
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default TitleListItem;
