import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";

/**
 * Contenedor con el menú superior
 * @returns
 */
const ContainerMenu = () => {
	return (
		<div>
			<Menu />
			<Outlet />
		</div>
	);
};

export default ContainerMenu;
