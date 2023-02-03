import { Link } from "react-router-dom";
import "./UserListItem.css";
import Card from "@mui/material/Card";
import { CardActionArea, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

/**
 * Representa un usuario en una lista de usuarios
 * @param {*} props
 * @returns
 */
const UserListItem = (props) => {
	// Estado de los títulos
	const [isFollowed, setIsFollowed] = useState(props.user.isFollowed);

	// Estado de la carga
	const [isFollowedLoading, setIsFollowedLoading] = useState(false);

	const navigate = useNavigate();

	// Redirección al hacer click
	const hanldeRedirect = () => {
		setTimeout(() => {
			navigate(`/user/${props.user.username}`);
		}, 200);
	};

	// Follow / unfollow de usuario
	const handleFollowed = () => {
		setIsFollowedLoading(true);
		if (isFollowed) {
			axios
				.delete(`http://api.ratemyshow.lekiam.net/users/${props.user.username}/follow`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFollowed(false);
				})
				.finally(setIsFollowedLoading(false));
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/users/${props.user.username}/follow`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFollowed(true);
				})
				.finally(setIsFollowedLoading(false));
		}
	};

	// Se obtiene la id de la imagen de perfil de usuario
	let imageId = props.user.avatarId;

	// Se carga el archivo
	let image = require(`../../images/user/${imageId}.png`);

	return (
		<Card sx={{ maxWidth: 250, maxHeight: 600 }} variant="outlined" className="userlistitem-card">
			<Box className="userlistitem-profile">
				<img src={image} alt="Foto de perfil" className="userlist-profile-image"></img>
			</Box>
			<Divider></Divider>
			<Box className="userlistitem-user">
				<Link to={`/users/${props.user.username}`}>
					<h3>{props.user.username}</h3>
				</Link>
				<div>
					{props.user.name} {props.user.surname}
				</div>
			</Box>

			<Divider></Divider>
			<Box className="userlistitem-button">
				<IconButton onClick={handleFollowed} disabled={isFollowed === null}>
					{isFollowedLoading ? <CircularProgress size={20} /> : <PersonAdd htmlColor={isFollowed ? "blue" : "grey"} />}
				</IconButton>
			</Box>
		</Card>
	);
};

export default UserListItem;
