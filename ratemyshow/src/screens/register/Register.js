import { Paper, TextField, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useRef, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "./Register.css";

/**
 * Pantalla de registro de usuario
 * @returns
 */
const Register = () => {
	const navigate = useNavigate();

	// Regex para comprobación de campos
	const phoneRegex = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/;
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const usernameRegex = /^[a-zA-Z0-9_]+$/;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{8,}$/;

	// Se almacena el estado del botón de login
	const [buttonDisabled, setbuttonDisabled] = useState(false);

	// Se almacenna el estado del mensaje de error
	const [warning, setWarning] = useState("");

	// Fecha actual
	let curr = new Date();
	curr.setDate(curr.getDate());
	let date = curr.toISOString().substring(0, 10);

	// Se definen referencias para los elementos del form
	const nameRef = useRef(null);
	const surnameRef = useRef(null);
	const emailRef = useRef(null);
	const phoneRef = useRef(null);
	const birthDateRef = useRef(null);
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const passwordRepeatRef = useRef(null);

	// Evento de registro
	const handleRegister = (e) => {
		e.preventDefault();

		// Se desactiva el botón
		setbuttonDisabled(true);

		// Se obtienen los valores de las referencias
		const name = nameRef.current.value;
		const surname = surnameRef.current.value;
		const email = emailRef.current.value;
		const phone = phoneRef.current.value;
		const birthDate = birthDateRef.current.value;
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		const passwordRepeat = passwordRepeatRef.current.value;

		// Se comprueba que la contraseña existe
		if (!password || !birthDate || !name || !surname || !username || !email) {
			setWarning(<Alert severity="warning">Rellena todos los campos.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que el correo es válido
		if (!email.match(emailRegex)) {
			setWarning(<Alert severity="warning">Introduce un correo válido.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que el número de teléfono es válido
		if (phone && !phone.match(phoneRegex)) {
			setWarning(<Alert severity="warning">Introduce un número de teléfono válido.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que la contraseña es válida
		if (!password.match(passwordRegex)) {
			setWarning(<Alert severity="warning">Introduce una contraseña válida (mínimo una letra y un número, y 8 caracteres).</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que el username tiene el formato correcto
		if (!username.match(usernameRegex)) {
			setWarning(<Alert severity="warning">Es necesario un nombre de usuario.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que las dos contraseñas coinciden
		if (password !== passwordRepeat) {
			setWarning(<Alert severity="warning">Las contraseñas no coinciden.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se almacena el formData
		const formData = {
			name: name,
			surname: surname,
			email: email,
			phone: phone,
			birthDate: birthDate,
			username: username,
			password: password,
		};

		// Se muestra al usuario que se está creando la cuenta
		setWarning(<Alert severity="info">Creando cuenta...</Alert>);

		axios
			// Se envía la petición
			.post("http://api.ratemyshow.lekiam.net/users", formData)
			// Se almacenan el token de sesión generado
			.then((response) => {
				localStorage.setItem("sessionToken", response.data.sessionToken);
				setWarning(<Alert severity="success">Cuenta creada correctamente. Sesión iniciada.</Alert>);
				afterRegister();
			})
			// Se muestran alertas en los códigos de error
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 400) {
						setWarning(<Alert severity="error">Error 400: Bad request.</Alert>);
					} else if (err.response.status === 409) {
						setWarning(<Alert severity="error">Error 409: Conflict.</Alert>);
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

	// Obtención de datos de usuario despues de crear cuenta
	const afterRegister = () => {
		axios.get("http://api.ratemyshow.lekiam.net/sessions", { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			// Se almacenan los datos del usuario
			localStorage.setItem("username", response.data.username);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("surname", response.data.surname);
			localStorage.setItem("avatarId", response.data.avatarId);

			// Se redirecciona al perfil
			navigate(`/users/${response.data.username}`);
		});
	};

	return (
		<div className="register-container">
			<div className="register-title">
				<Typography variant="h3">Registro</Typography>
			</div>
			<div className="register-form-container">
				<Paper variant="outlined">
					<form onSubmit={handleRegister} className="register-form">
						<div className="register-input-container">
							<TextField required id="name-input" label="Nombre" type="text " autoComplete="current-name" inputRef={nameRef} className="register-text-field" inputProps={{ maxLength: 32 }} />
						</div>

						<div className="register-input-container">
							<TextField required id="surname-input" label="Apellidos" type="text " autoComplete="current-surname" inputRef={surnameRef} className="register-text-field" inputProps={{ maxLength: 32 }} />
						</div>

						<div className="register-input-container">
							<TextField required id="email-input" label="E-Mail" type="text " autoComplete="current-email" inputRef={emailRef} className="register-text-field" inputProps={{ maxLength: 64 }} />
						</div>

						<div className="register-input-container">
							<TextField id="phone-input" label="Teléfono (con prefijo)" type="text " autoComplete="current-phone" inputRef={phoneRef} className="register-text-field" inputProps={{ maxLength: 32 }} />
						</div>

						<Paper className="register-input-container-date" variant="outlined">
							<div className="register-input-text register-required">Fecha de nacimiento</div>
							<input name="birthDate" type="date" ref={birthDateRef} defaultValue={date}></input>
						</Paper>

						<div className="register-input-container">
							<TextField required id="username-input" label="Nombre de usuario" type="text " autoComplete="current-username" inputRef={usernameRef} className="register-text-field" inputProps={{ maxLength: 32 }} />
						</div>

						<div className="register-input-container">
							<TextField required id="password-input" label="Contraseña" type="password" autoComplete="current-password" inputRef={passwordRef} className="login-text-field" inputProps={{ maxLength: 32 }} />
						</div>

						<div className="register-input-container">
							<TextField required id="password-input" label="Repetir contraseña" type="password" autoComplete="current-password" inputRef={passwordRepeatRef} className="login-text-field" inputProps={{ maxLength: 32 }} />
						</div>

						<div>{warning}</div>

						<div className="register-button-container">
							<AwesomeButton type="primary" className="register-button" disabled={buttonDisabled}>
								Registro
							</AwesomeButton>
						</div>

						<div className="register-other">
							<a href="/login">Iniciar sesión</a>
							<div className="register-guide">*Requerido</div>
						</div>
					</form>
				</Paper>
			</div>
		</div>
	);
};

export default Register;
