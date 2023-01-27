import Alert from "@mui/material/Alert";
import axios from "axios";
import { useRef, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Login.css";

/**
 * Pantalla de inicio de sesión
 * @returns
 */
const Login = () => {
	// Se almacena el estado del botón de login
	const [buttonDisabled, setbuttonDisabled] = useState(false);
	const [warning, setWarning] = useState("");

	// Se definen referencias para los elementos del form
	const identifierRef = useRef(null);
	const passwordRef = useRef(null);

	// Evento de inicio de sesión
	const handleLogin = (e) => {
		e.preventDefault();

		// Se desactiva el botón
		setbuttonDisabled(true);

		// Se obtienen los valores de las referencias
		const identifier = identifierRef.current.value;
		const password = passwordRef.current.value;

		// Se almacena el formData
		const formData = {
			identifier: identifier,
			password: password,
		};

		axios
			// Se envía la petición
			.post("http://localhost:8000/sessions", formData)
			// Se almacenan el token de sesión generado
			.then((response) => {
				localStorage.setItem("sessionToken", response.data.sessionToken);
				setWarning(<Alert severity="success">Sesión iniciada. Redirigiendo...</Alert>);
			})
			// Se muestran alertas en los códigos de error
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 400) {
						setWarning(<Alert severity="error">Error: Bad request.</Alert>);
					} else if (err.response.status === 401) {
						setWarning(<Alert severity="error">Error: Bad request.</Alert>);
					} else {
						setWarning(<Alert severity="error">{`Error, código:${err.response.status}.`}</Alert>);
					}
				} else {
					setWarning(<Alert severity="error">Error de conexión.</Alert>);
				}
			})
			.finally(() => {
				// Se activa el botón
				setbuttonDisabled(false);
			});
	};

	return (
		<div className="login-container">
			<div className="login-title">
				<h1>Inicio de sesión</h1>
			</div>
			<div className="login-form-container">
				<form onSubmit={handleLogin} className="login-form">
					<div className="login-input-container">
						<div className="login-required login-input-text">Identificador</div>
						<input name="username" type="text" ref={identifierRef}></input>
					</div>
					<div className="login-input-container">
						<div className="login-required login-input-text">Contraseña</div>
						<input name="password" type="password" ref={passwordRef}></input>
					</div>
					<div>{warning}</div>
					<div className="login-button-container">
						<AwesomeButton type="primary" className="login-button" disabled={buttonDisabled}>
							Iniciar sesion
						</AwesomeButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
