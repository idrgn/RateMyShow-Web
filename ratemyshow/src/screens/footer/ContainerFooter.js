import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

/**
 * Contenedor con el footer
 * @returns
 */
const ContainerFooter = () => {
	return (
		<div>
			<Outlet />
			<Footer />
		</div>
	);
};

export default ContainerFooter;
