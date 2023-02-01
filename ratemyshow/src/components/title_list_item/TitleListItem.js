import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Divider, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleListItem.css";

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

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<Card sx={{ maxWidth: 200, maxHeight: 600 }} variant="outlined" className="titlelistitem-card">
			<CardMedia sx={{ height: 300, width: 200, cursor: "pointer" }} image={props.title.cover ? props.title.cover : "http://api.ratemyshow.lekiam.net/img/cover"} title="Title" onClick={hanldeRedirect} />
			<Divider></Divider>

			<CardContent sx={{ pb: 0, pl: 0, pr: 0 }}>
				<Tooltip title={props.title.primaryTitle} placement="top">
					<Typography className="titlelistitem-title" align="center" gutterBottom variant="h6" sx={{ fontWeight: "bold", height: 66, overflow: "scroll", WebkitLineClamp: 2, WebkitAlignContent: "center", display: "-webkit-box", WebkitBoxOrient: "vertical" }}>
						{props.title.primaryTitle}
					</Typography>
				</Tooltip>

				<Divider sx={{ mb: 2, mt: 2 }}></Divider>

				<Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
					<Typography noWrap gutterBottom variant="subtitle1">
						{props.title.startYear} {props.title.endYear ? "-" : ""} {props.title.endYear ? props.title.endYear : ""}
					</Typography>
					<Typography noWrap gutterBottom variant="subtitle2">
						{capitalizeFirstLetter(props.title.titleType)}
					</Typography>
				</Box>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites" onClick={handleFavorite} disabled={isFavorite === null}>
					{isFavoriteLoading ? <CircularProgress size={20} /> : <FavoriteIcon htmlColor={isFavorite ? "red" : "grey"} />}
				</IconButton>
				<IconButton aria-label="add to pending" onClick={handlePending} disabled={isFavorite === null}>
					{isPendingLoading ? <CircularProgress size={20} /> : <AddToQueueIcon htmlColor={isPending ? "blue" : "grey"} />}
				</IconButton>
				<Typography sx={{ marginLeft: "auto", marginRight: "0.5vw", color: "grey" }}>{props.title.rating ? props.title.rating.toFixed(1) + " / 5.0" : "No ratings"}</Typography>
			</CardActions>
		</Card>
	);
};

export default TitleListItem;
