import "./userListItem.css";

/**
 * Representa un usuario en una lista de usuarios
 * @param {*} props
 * @returns
 */
const UserListItem = (props) => {
  let imageId = props.user.avatarId;
  let image = require("../../images/user/" + imageId + ".png");
  return (
    <div>
      <div className="contenedorImagen">
        <img src={image} alt="Foto de perfil" className="imagenPerfil"></img>
      </div>
      <div className="contenedorDatos">
        <h3>{props.user.username}</h3>
        <p>{props.user.name}</p>
      </div>
    </div>
  );
};

export default UserListItem;
