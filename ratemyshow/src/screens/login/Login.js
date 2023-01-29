import { Paper, TextField, Typography } from "@mui/material";
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
	// Regex para comprobación de campos
	const phoneRegex = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/;
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const usernameRegex = /^[a-zA-Z0-9]+$/;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

	// Se almacena el estado del botón de login
	const [buttonDisabled, setbuttonDisabled] = useState(false);

	// Se almacenna el estado del mensaje de error
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

		// Se comprueba que la contraseña existe
		if (!password || !identifier) {
			setWarning(<Alert severity="warning">Rellena todos los campos.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que el identificador es válido
		if (!(identifier.match(phoneRegex) || identifier.match(emailRegex) || identifier.match(usernameRegex))) {
			setWarning(<Alert severity="warning">Introduce un identificador válido (Correo, nombre de usuario o teléfono).</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que la contraseña es válida
		if (!password.match(passwordRegex)) {
			setWarning(<Alert severity="warning">Introduce una contraseña válida.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se almacena el formData
		const formData = {
			identifier: identifier,
			password: password,
		};

		// Se muestra al usuario que se está iniciando sesión
		setWarning(<Alert severity="info">Iniciando sesión...</Alert>);

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
						setWarning(<Alert severity="error">Error 400: Bad request.</Alert>);
					} else if (err.response.status === 401) {
						setWarning(<Alert severity="error">Error 401: Unauthorized.</Alert>);
					} else {
						setWarning(<Alert severity="error">{`Error, código ${err.response.status}.`}</Alert>);
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
				<Typography variant="h3">Inicio de sesión</Typography>
			</div>
			<div className="login-form-container">
				<Paper variant="outlined">
					<form onSubmit={handleLogin} className="login-form">
						<div className="login-input-container">
							<TextField required id="identifier-input" label="Identificador" type="text " autoComplete="current-username" inputRef={identifierRef} className="login-text-field" />
						</div>

						<div className="login-input-container">
							<TextField required id="password-input" label="Contraseña" type="password" autoComplete="current-password" inputRef={passwordRef} className="login-text-field" />
						</div>

						<div>{warning}</div>

						<div className="login-button-container">
							<AwesomeButton type="primary" className="login-button" disabled={buttonDisabled}>
								Iniciar sesion
							</AwesomeButton>
						</div>

						<div className="login-other">
							<a href="/register">Crear cuenta</a>
							<div className="login-guide">*Requerido</div>
						</div>
					</form>
				</Paper>
			</div>
		</div>
	);
};

export default Login;
