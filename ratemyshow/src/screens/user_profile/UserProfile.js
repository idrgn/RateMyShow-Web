import { PersonAdd } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import TitleListItem from "../../components/title_list_item/TitleListItem";
import "./UserProfile.css";

const UserProfile = (props) => {
	const { username } = useParams();
	const params = useParams();

	// Creamos estado para almacenar la lista de usuarios
	const [userProfile, setUserProfile] = useState({ favorites: [], pending: [] });

	// Creamos estado para almacenar la lista imagenes de perfil
	const [image, setImage] = useState(require(`../../images/user/6.png`));

	// Creamos estado para saber si se ha cargado la imagen.
	const [isLoading, setIsLoading] = useState(true);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setUserProfile(response.data);
			console.log(JSON.stringify(response.data));
			//localStorage.removeItem("sessionToken");
			let newImage = require(`../../images/user/${response.data.avatarId}.png`);
			setImage(newImage);
			setIsLoading(false);
		});
	}, []);

	// Función para transformar títulos a componente.
	const recommendationsToComponent = (u) => {
		return <TitleListItem title={u} />;
	};

	if (isLoading)
		return (
			<div>
				<Loading /> :
			</div>
		);

	return (
		<div className="userprofile-container">
			<div className="userprofile-profiledata">
				<div className="userprofile-image">
					<img src={image} alt="Foto de perfil" />
				</div>

				<div className="userprofile-data">
					<div>
						<span>Nombre de usuario: </span>
						{userProfile.username}
					</div>
					<div>
						<span>Nombre: </span>
						{userProfile.name}
					</div>
					<div>
						<span>Apellido: </span>
						{userProfile.surname}
					</div>
					<div>
						<span>Email: </span>
						{userProfile.email}
					</div>
					<div>
						<span>Teléfono: </span>
						{userProfile.phone}
					</div>
					<div>
						<span>Seguidores: </span>
						{userProfile.numFollowers}
					</div>
					<div>
						<span>Seguidos: </span>
						{userProfile.numFollowing}
					</div>
				</div>
			</div>
			<div className="userprofile-buttons">
				<Link to={`/users/${username}/followers`} style={{ textDecoration: "none" }}>
					<Button variant="contained">Seguidores</Button>
				</Link>
				<Link to={`/users/${username}/following`} style={{ textDecoration: "none" }}>
					<Button>Seguidos</Button>
				</Link>
				<Link to={`/users/${username}/ratings`} style={{ textDecoration: "none" }}>
					<Button>Valoraciones</Button>
				</Link>
				<IconButton>
					<PersonAdd></PersonAdd>
				</IconButton>
			</div>
			<div className="userprofile-fav-pending">
				<h1>FAVORITAS</h1>
				<TitleList titles={userProfile.favorites}></TitleList>
				<h1>PENDIENTES</h1>
				<TitleList titles={userProfile.pending}></TitleList>
			</div>
		</div>
	);
};

export default UserProfile;
