import { useRef } from "react";

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
		const password = passwordRef.current.value;
		const passwordRepeat = passwordRepeatRef.current.value;

		if (password !== passwordRepeat) {
			alert("Las contraseñas no coinciden.");
		}
	};

	return (
		<div>
			<div>
				<h1>Registro</h1>
			</div>
			<div>
				<form onSubmit={handleRegister}>
					<label for="name">Nombre</label>
					<input name="name" type="text" ref={nameRef}></input>
					<br></br>

					<label for="surname">Apellidos</label>
					<input name="surname" type="text" ref={surnameRef}></input>
					<br></br>

					<label for="e-mail">E-Mail</label>
					<input name="e-mail" type="text" ref={emailRef}></input>
					<br></br>

					<label for="phone">Teléfono</label>
					<input name="phone" type="text" ref={phoneRef}></input>
					<br></br>

					<label for="birthDate">Fecha de nacimiento</label>
					<input name="birthDate" type="date" ref={birthDateRef}></input>
					<br></br>

					<label for="username">Nombre de usuario</label>
					<input name="username" type="text" ref={usernameRef}></input>
					<br></br>

					<label for="password">Contraseña</label>
					<input name="password" type="password" ref={passwordRef}></input>
					<br></br>

					<label for="password-repeat">Repetir contraseña</label>
					<input name="password-repeat" type="password" ref={passwordRepeatRef}></input>
					<br></br>

					<button>Registro</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
