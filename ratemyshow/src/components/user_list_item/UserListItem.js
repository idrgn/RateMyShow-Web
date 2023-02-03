import { Link } from "react-router-dom";
import "./UserListItem.css";
import Card from "@mui/material/Card";
import { CardActionArea, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

/**
 * Representa un usuario en una lista de usuarios
 * @param {*} props
 * @returns
 */
const UserListItem = (props) => {
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
				<IconButton>
					<PersonAdd />
				</IconButton>
			</Box>
		</Card>
	);
};

export default UserListItem;
