import IconButton from "@material-ui/core/IconButton";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const TitleListItem = (props) => {
	const handleFavorite = () => {};
	const handlePending = () => {};

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
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="add to pending" onClick={handlePending}>
					<AddToQueueIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default TitleListItem;
