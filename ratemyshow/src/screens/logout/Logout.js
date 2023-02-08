import { Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

/**
 * Pantalla encargada del cierre de sesión
 * @returns
 */
const Logout = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [openMessage, setOpenMessage] = useState("");

	useEffect(() => {
		axios
			.delete("http://api.ratemyshow.lekiam.net/sessions", { headers: { SessionToken: localStorage.getItem("sessionToken") } })
			.then((response) => {
				removeLocalStorageItems();
				setOpenMessage("Sesión cerrada.");
				setOpen(true);
				setTimeout(() => {
					navigate("/login");
				}, 200);
			})
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 404) {
						removeLocalStorageItems();
						setOpenMessage("Error 404: El usuario no existe.");
						setOpen(true);
						setTimeout(() => {
							navigate("/login");
						}, 200);
					} else if (err.response.status === 401) {
						setOpenMessage("Error 401: Falta token de sesión.");
						setOpen(true);
						setTimeout(() => {
							navigate("/login");
						}, 200);
					}
				}
			});
	}, [navigate]);

	const removeLocalStorageItems = () => {
		// Eliminar session token almacenado
		localStorage.removeItem("sessionToken");
		// Eliminar datos de usuario almacenados
		localStorage.removeItem("username");
		localStorage.removeItem("name");
		localStorage.removeItem("surname");
		localStorage.removeItem("avatarId");
	};

	return (
		<div>
			<Loading></Loading>
			<Snackbar sx={{ marginBottom: "8vh" }} open={open} autoHideDuration={4000} message={openMessage} />
		</div>
	);
};

export default Logout;
