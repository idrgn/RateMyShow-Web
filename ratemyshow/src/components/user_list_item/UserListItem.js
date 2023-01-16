/**
 * Representa un usuario en una lista de usuarios
 * @param {*} props
 * @returns
 */
const UserListItem = (props) => {
  return (
    <div>
      <h3>{props.user.username}</h3>
      <p>{props.user.name}</p>
    </div>
  );
};

export default UserListItem;
