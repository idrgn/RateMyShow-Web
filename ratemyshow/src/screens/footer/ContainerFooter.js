import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

/**
 * Contenedor con el footer
 * @returns
 */
const ContainerFooter = () => {
	return (
		<div style={{ minHeight: "100%" }}>
			<div style={{ minHeight: "100%" }}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default ContainerFooter;
