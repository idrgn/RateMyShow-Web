import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/header/Header";

/**
 * Contenedor con el header superior
 * @returns
 */
const Header = () => {
	return (
		<div>
			<HeaderComponent />
			<Outlet />
		</div>
	);
};

export default Header;
