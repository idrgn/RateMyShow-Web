import { Link } from "react-router-dom";
import "./NotFound.css";

/**
 * Pantalla de not found
 * @param {*} props
 * @returns
 */
const NotFound = (props) => {
	return (
		<div className="not-found">
			<h1>404 - No encontrado :(</h1>
			<Link to="/">Volver a página inicial</Link>
		</div>
	);
};

export default NotFound;
