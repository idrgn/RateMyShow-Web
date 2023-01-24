import axios from "axios";
import { useRef } from "react";

/**
 * Pantalla de inicio de sesión
 * @returns
 */
const Login = () => {
	// Se definen referencias para los elementos del form
	const identifierRef = useRef(null);
	const passwordRef = useRef(null);

	// Evento de inicio de sesión
	const handleRegister = (e) => {
		e.preventDefault();

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
			})
			// Se muestran alertas en los códigos de error
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 400) alert("Bad request");
					else if (err.response.status === 401) alert("Unauthorized");
					else alert(`Error, código:${err.response.status}`);
				} else {
					alert(`Error: ${JSON.stringify(err)}`);
				}
			});
	};

	return (
		<div>
			<div>
				<h1>Inicio de sesión</h1>
			</div>
			<div>
				<form onSubmit={handleRegister}>
					<label for="identifier">Identificador</label>
					<input name="username" type="text" ref={identifierRef}></input>
					<br></br>

					<label for="password">Contraseña</label>
					<input name="password" type="password" ref={passwordRef}></input>
					<br></br>

					<button>Iniciar sesión</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
