import axios from "axios";
import { useRef } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./Register.css";
/**
 * Pantalla de registro de usuario
 * @returns
 */
const Register = () => {
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
			alert("Rellena todos los campos");
			return;
		}

		// Se comprueba que el correo es válido
		if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			alert("Introduce un correo válido.");
			return;
		}

		// Se comprueba que las dos contraseñas coinciden
		if (password !== passwordRepeat) {
			alert("Las contraseñas no coinciden.");
			return;
		}

		// Se comprueba que el username tiene el formato correcto
		if (!username.match(/^[a-zA-Z0-9]+$/)) {
			alert("Es necesario un nombre de usuario.");
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
			})
			// Se muestran alertas en los códigos de error
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 400) alert("Bad request");
					else if (err.response.status === 409) alert("Conflict");
					else alert(`Error, código:${err.response.status}`);
				} else {
					alert(`Error: ${JSON.stringify(err)}`);
				}
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
						<input name="name" type="text" ref={nameRef}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">Apellidos</div>
						<input name="surname" type="text" ref={surnameRef}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text register-required">E-Mail</div>
						<input name="e-mail" type="text" ref={emailRef}></input>
					</div>

					<div className="register-input-container">
						<div className="register-input-text">Teléfono</div>
						<input name="phone" type="text" ref={phoneRef}></input>
					</div>
					<div className="register-input-container">
						<div className="register-input-text register-required">Fecha de nacimiento</div>
						<input name="birthDate" type="date" ref={birthDateRef}></input>
					</div>
					<div className="register-input-container">
						<div className="register-input-text register-required">Nombre de usuario</div>
						<input name="username" type="text" ref={usernameRef}></input>
					</div>
					<div className="register-input-container">
						<div className="register-input-text register-required">Contraseña</div>
						<input name="password" type="password" ref={passwordRef}></input>
					</div>
					<div className="register-input-container">
						<div className="register-input-text register-required">Repetir contraseña</div>
						<input name="password-repeat" type="password" ref={passwordRepeatRef}></input>
					</div>

					<div className="register-button-container">
						<AwesomeButton type="primary" className="register-button">
							Registro
						</AwesomeButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
