import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TitleListItem from "../../components/title_list_item/TitleListItem";
import "./UserProfile.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { PersonAdd, PersonAddDisabled } from "@mui/icons-material";
import Loading from "../../components/loading/Loading";

import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const UserProfile = (props) => {
	const { username } = useParams();
	const params = useParams();

	// Creamos estado para almacenar la lista de usuarios
	const [userProfile, setUserProfile] = useState({ favorites: [], pending: [] });

	// Creamos estado para almacenar la lista imagenes de perfil
	const [image, setImage] = useState(require(`../../images/user/6.png`));

	// Creamos estado para saber si se ha cargado la imagen.
	const [isLoading, setIsLoading] = useState(true);

	// Estado de los títulos
	const [isFollowed, setIsFollowed] = useState(false);

	// Estado de la carga
	const [isFollowedLoading, setIsFollowedLoading] = useState(false);

	const navigate = useNavigate();

	// Redirección al hacer click
	const hanldeRedirect = () => {
		setTimeout(() => {
			navigate(`/user/${params.username}`);
		}, 200);
	};

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/users/${params.username}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setUserProfile(response.data);
			let newImage = require(`../../images/user/${response.data.avatarId}.png`);
			setImage(newImage);
			setIsLoading(false);
			setIsFollowed(response.data.isFollowed);
		});
	}, [params.username]);

	// Follow / unfollow de usuario
	const handleFollowed = () => {
		setIsFollowedLoading(true);
		if (isFollowed) {
			axios
				.delete(`http://api.ratemyshow.lekiam.net/users/${params.username}/follow`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFollowed(false);
				})
				.finally(setIsFollowedLoading(false));
		} else {
			axios
				.put(`http://api.ratemyshow.lekiam.net/users/${params.username}/follow`, {}, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
				.then((response) => {
					setIsFollowed(true);
				})
				.finally(setIsFollowedLoading(false));
		}
	};

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
						{userProfile.followers}
					</div>
					<div>
						<span>Seguidos: </span>
						{userProfile.following}
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
				<IconButton
					onClick={handleFollowed}
					style={{
						color: isFollowed ? "#436cf3" : "white",
						backgroundColor: isFollowed ? "white" : "#436cf3",
					}}
				>
					{isFollowed ? <PersonAddDisabled /> : <PersonAdd />}
				</IconButton>
			</div>
			<div className="userprofile-fav-pending">
				<div>
					<h1>FAVORITAS</h1>
					<div className="userprofile-fav">{userProfile.favorites.map(recommendationsToComponent)}</div>
				</div>
				<div>
					<h1>PENDIENTES</h1>
					<div className="userprofile-pending">{userProfile.pending.map(recommendationsToComponent)}</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
