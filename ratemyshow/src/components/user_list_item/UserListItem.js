import "./UserListItem.css";

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
		<div>
			<div className="userlist-image">
				<img src={image} alt="Foto de perfil" className="userlist-profile-image"></img>
			</div>
			<div className="userlist-data">
				<h3>{props.user.username}</h3>
				<p>{props.user.name}</p>
			</div>
		</div>
	);
};

export default UserListItem;
