import { useState } from "react";
import "./mainpage.css";

import image1 from "../../images/main_page/cover-1.jpg";
import image2 from "../../images/main_page/cover-2.jpg";
import image3 from "../../images/main_page/cover-3.jpg";
import image4 from "../../images/main_page/cover-4.jpg";
import image5 from "../../images/main_page/cover-5.jpg";

import leftArrow from "../../images/main_page/left-arrow.png";
import rightArrow from "../../images/main_page/right-arrow.png";

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
		<div className="root-container">
			<div className="main-menu-container">
				<div className="image-section">
					<img src={images[(currentIndex + 1) % images.length]} className="image-behind-right main-page-image" alt="behind-right" />
					<img src={images[(currentIndex + 2) % images.length]} className="image-behind-left main-page-image" alt="behind-left" />
					<img src={images[currentIndex]} className="image-front main-page-image" alt="current" />
					<img onClick={previousImage} src={leftArrow} alt="previous" className="previous-arrow" />
					<img onClick={nextImage} src={rightArrow} alt="next" className="next-arrow" />
				</div>
				<div className="log-in">
					<a href="#/">INICIAR SESIÓN</a>
				</div>
				<div className="sign-up">
					<a href="#/">REGISTRO</a>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
