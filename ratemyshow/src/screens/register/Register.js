import Alert from "@mui/material/Alert";
import axios from "axios";
import { useRef, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Register.css";

/**
 * Pantalla de registro de usuario
 * @returns
 */
const Register = () => {
	// Se almacena el estado del botón de login
	const [buttonDisabled, setbuttonDisabled] = useState(false);

	// Se almacenna el estado del mensaje de error
	const [warning, setWarning] = useState("");

	// Fecha actual
	let curr = new Date();
	curr.setDate(curr.getDate() + 3);
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
		if (!password || !birthDate || !name || !surname || !username) {
			setWarning(<Alert severity="warning">Rellena todos los campos.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que el correo es válido
		if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			setWarning(<Alert severity="warning">Introduce un correo válido.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que las dos contraseñas coinciden
		if (password !== passwordRepeat) {
			setWarning(<Alert severity="warning">Las contraseñas no coinciden.</Alert>);
			setbuttonDisabled(false);
			return;
		}

		// Se comprueba que el username tiene el formato correcto
		if (!username.match(/^[a-zA-Z0-9]+$/)) {
			setWarning(<Alert severity="warning">Es necesario un nombre de usuario.</Alert>);
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

		axios
			// Se envía la petición
			.post("http://localhost:8000/users", formData)
			// Se almacenan el token de sesión generado
			.then((response) => {
				localStorage.setItem("sessionToken", response.data.sessionToken);
				setWarning(<Alert severity="success">Cuenta creada correctamente. Sesión iniciada.</Alert>);
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

	return (
		<div className="register-container">
			<div className="register-title">
				<h1>Registro</h1>
			</div>
			<div className="register-form-container">
				<form onSubmit={handleRegister} className="register-form">
					<div className="register-input-container">
						<div className="register-input-text register-required">Nombre</div>
						<input name="name" type="text" ref={nameRef} maxLength={32}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">Apellidos</div>
						<input name="surname" type="text" ref={surnameRef} maxLength={32}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">E-Mail</div>
						<input name="e-mail" type="text" ref={emailRef} maxLength={32}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text">Teléfono</div>
						<input name="phone" type="text" ref={phoneRef} maxLength={32}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">Fecha de nacimiento</div>
						<input name="birthDate" type="date" ref={birthDateRef} defaultValue={date}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">Nombre de usuario</div>
						<input name="username" type="text" ref={usernameRef} maxLength={32}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">Contraseña</div>
						<input name="password" type="password" ref={passwordRef} maxLength={32}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">Repetir contraseña</div>
						<input name="password-repeat" type="password" ref={passwordRepeatRef} maxLength={32}></input>
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
			</div>
		</div>
	);
};

export default Register;
