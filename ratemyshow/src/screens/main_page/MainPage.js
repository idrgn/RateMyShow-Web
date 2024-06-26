import { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import image1 from "../../images/main_page/cover-1.jpg";
import image2 from "../../images/main_page/cover-2.jpg";
import image3 from "../../images/main_page/cover-3.jpg";
import image4 from "../../images/main_page/cover-4.jpg";
import image5 from "../../images/main_page/cover-5.jpg";
import leftArrow from "../../images/main_page/left-arrow.png";
import rightArrow from "../../images/main_page/right-arrow.png";

/**
 * Página inicial
 * @returns
 */
const MainPage = () => {
	// Se crea el estado para almacenar el índice actual del cover
	const [currentIndex, setCurrentIndex] = useState(0);

	// Se crea un array con los covers
	const images = [image1, image2, image3, image4, image5];

	// Cambiar a la imagen previa
	const previousImage = () => {
		setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
	};

	// Cambiar a la siguiente imagen
	const nextImage = () => {
		setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
	};

	return (
		<div className="mainpage-root-container">
			<div className="mainpage-container">
				<div className="mainpage-image-section">
					<img src={images[(currentIndex + 1) % images.length]} className="mainpage-image-behind-right mainpage-image" alt="behind-right" />
					<img src={images[(currentIndex + 2) % images.length]} className="mainpage-image-behind-left mainpage-image" alt="behind-left" />
					<img src={images[currentIndex]} className="mainpage-image-front mainpage-image" alt="current" />
					<img onClick={previousImage} src={leftArrow} alt="previous" className="mainpage-previous-arrow" />
					<img onClick={nextImage} src={rightArrow} alt="next" className="mainpage-next-arrow" />
				</div>
				<div className="mainpage-log-in">
					<Link to="/login">INICIAR SESIÓN</Link>
				</div>
				<div className="mainpage-sign-up">
					<Link to="/register">REGISTRO</Link>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
