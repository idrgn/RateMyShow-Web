import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

/**
 * Contenedor con el header superior
 * @returns
 */
const ContainerHeader = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default ContainerHeader;
