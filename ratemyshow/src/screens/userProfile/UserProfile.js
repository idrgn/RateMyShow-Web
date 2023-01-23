import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  const params = useParams();

  // Creamos estado para almacenar la lista de usuarios
  const [userProfile, setUserProfile] = useState({ favorites: [], pending: [] });
  // Creamos estado para almacenar la lista imagenes de perfil
  const [image, setImage] = useState(require(`../../images/user/1.png`));

  // Pedimos los datos a la API
  useEffect(() => {
    axios.get(`https://0ee0ee41-ff72-4ce8-a306-41b3a57f8eb0.mock.pstmn.io/users/${params.username}`).then((response) => {
      setUserProfile(response.data);
      let newImage = require(`../../images/user/${userProfile.avatarId}.png`);
      setImage(newImage);
    });
  }, []);

  return (
    <div>
      <div>
        <img src={image} alt="Foto de perfil" className="imagenPerfil"></img>
        <div>Nombre de usuario: {userProfile.username}</div>
        <div>Nombre: {userProfile.name}</div>
        <div>Apellido: {userProfile.surname}</div>
        <div>Email: {userProfile.email}</div>
        <div>Teléfono: {userProfile.phone}</div>
        <div>Seguidores: {userProfile.numFollowers}</div>
        <div>Seguidos: {userProfile.numFollowing}</div>
      </div>
    </div>
  );
};

export default UserProfile;
