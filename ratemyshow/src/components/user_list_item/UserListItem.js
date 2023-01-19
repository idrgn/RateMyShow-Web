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
      <img src={image} alt="Foto de perfil"></img>
      <h3>{props.user.username}</h3>
      <p>{props.user.name}</p>
    </div>
  );
};

export default UserListItem;
