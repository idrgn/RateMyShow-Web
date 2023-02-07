import { PersonAdd, PersonAddDisabled } from "@mui/icons-material";
import { Button, CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./UserProfile.css";

const UserProfile = (props) => {
	const { username } = useParams();
	const params = useParams();

	// Creamos estado para almacenar la lista de usuarios
	const [userProfile, setUserProfile] = useState({ favorites: [], pending: [] });

	// Creamos estado para saber si se ha cargado la imagen.
	const [isLoading, setIsLoading] = useState(true);

	// Estado de los títulos
	const [isFollowed, setIsFollowed] = useState(false);

	// Estado de la carga
	const [isFollowedLoading, setIsFollowedLoading] = useState(false);

	// Estado de usuario no encontrado
	const [notFound, setNotFound] = useState(false);

	// Pedimos los datos a la API
	useEffect(() => {
		axios
			.get(`http://api.ratemyshow.lekiam.net/users/${params.username}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
			.then((response) => {
				setUserProfile(response.data);
				setIsLoading(false);
				setNotFound(false);
				setIsFollowed(response.data.isFollowed);
			})
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 404) {
						setIsLoading(false);
						setNotFound(true);
					}
				}
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

	if (isLoading)
		return (
			<div>
				<Loading /> :
			</div>
		);

	if (notFound) {
		return <div className="general-error">Usuario no encontrado</div>;
	}

	return (
		<div className="userprofile-container">
			<div className="userprofile-profiledata">
				<div className="userprofile-image">
					<img src={`http://api.ratemyshow.lekiam.net/pfp/${userProfile.avatarId}`} alt="Foto de perfil" />
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
					<div hidden={!userProfile.isOwnUser}>
						<span>Email: </span>
						{userProfile.email}
					</div>
					<div hidden={!userProfile.isOwnUser}>
						<span>Teléfono: </span>
						{userProfile.phone ? userProfile.phone : "Sin número de teléfono"}
					</div>
					<div>
						<span>Seguidores: </span>
						{userProfile.followers}
					</div>
					<div>
						<span>Seguidos: </span>
						{userProfile.following}
					</div>
					<div>
						<span>Valoraciones: </span>
						{userProfile.totalRatings}
					</div>
					<div>
						<span>Tiempo de visualización: </span>
						{userProfile.watchTime ? userProfile.watchTime : "0"} minutos
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
					{isFollowedLoading ? <CircularProgress size={20}></CircularProgress> : isFollowed ? <PersonAddDisabled /> : <PersonAdd />}
				</IconButton>
			</div>
			<div className="userprofile-fav-pending">
				<div className="userprofile-title-container" hidden={userProfile.favorites.length === 0}>
					<h1 className="userprofile-fav">TÍTULOS FAVORITOS</h1>
				</div>
				<TitleList titles={userProfile.favorites}></TitleList>
				<div className="userprofile-title-container" hidden={userProfile.pending.length === 0}>
					<h1 className="userprofile-pending">TÍTULOS PENDIENTES</h1>
				</div>
				<TitleList titles={userProfile.pending}></TitleList>
			</div>
		</div>
	);
};

export default UserProfile;
