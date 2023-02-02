import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Logout = () => {
	const navigate = useNavigate();

	// Se envía la petición de cerrar sesión
	axios.delete("http://api.ratemyshow.lekiam.net/sessions", { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
		// Eliminar session token almacenado
		localStorage.removeItem("sessionToken");

		// Eliminar datos de usuario almacenados
		localStorage.removeItem("username");
		localStorage.removeItem("name");
		localStorage.removeItem("surname");
		localStorage.removeItem("avatarId");

		// Redirección a login
		navigate("/login");
	});

	return (
		<div>
			<Loading></Loading>
		</div>
	);
};

export default Logout;
