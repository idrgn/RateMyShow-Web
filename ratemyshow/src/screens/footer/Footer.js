import { Outlet } from "react-router-dom";
import FooterComponent from "../../components/footer/Footer";

/**
 * Contenedor con el footer
 * @returns
 */
const Footer = () => {
	return (
		<div>
			<Outlet />
			<FooterComponent />
		</div>
	);
};

export default Footer;
