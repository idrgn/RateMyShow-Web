import IconButton from "@material-ui/core/IconButton";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";

/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const TitleListItem = (props) => {
	const [isFavorite, setIsFavorite] = useState(props.title.isFavorite);
	const [isPending, setIsPending] = useState(props.title.isPending);

	const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
	const [isPendingLoading, setIsPendingLoading] = useState(false);

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
			<CardMedia sx={{ height: 300, width: 200 }} image={props.title.cover} title="Title" />
			<CardContent>
				<Typography noWrap gutterBottom variant="h6">
					{props.title.primaryTitle}
				</Typography>
				<Typography noWrap gutterBottom variant="subtitle1">
					{props.title.startYear}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites" onClick={handleFavorite}>
					{isFavoriteLoading ? <CircularProgress size={20} /> : <FavoriteIcon htmlColor={isFavorite ? "red" : "grey"} />}
				</IconButton>
				<IconButton aria-label="add to pending" onClick={handlePending}>
					{isPendingLoading ? <CircularProgress size={20} /> : <AddToQueueIcon htmlColor={isPending ? "blue" : "grey"} />}
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default TitleListItem;
