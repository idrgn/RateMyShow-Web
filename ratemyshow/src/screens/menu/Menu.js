import { Outlet } from "react-router-dom";
import MenuComponent from "../../components/menu/Menu";

/**
 * Contenedor con el menú superior
 * @returns
 */
const Menu = () => {
	return (
		<div>
			<MenuComponent />
			<Outlet />
		</div>
	);
};

export default Menu;
