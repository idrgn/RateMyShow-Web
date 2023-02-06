import "./Footer.css";
import facebook from "../../images/footer/facebook.svg";
import instagram from "../../images/footer/instagram.svg";
import tiktok from "../../images/footer/tiktok.svg";
import twitter from "../../images/footer/twitter.svg";

/**
 * Footer
 * @param {*} props
 * @returns
 */
const Footer = (props) => {
	return (
		<div className="footer">
			<div className="footer-links">
				<a href="http://ratemyshow.lekiam.net">Términos y condiciones</a>
				<a href="http://ratemyshow.lekiam.net">Políticas de privacidad</a>
				<a href="http://ratemyshow.lekiam.net">© RateMyShow.com</a>
			</div>

			<div className="footer-icons">
				<a href="https://facebook.com">
					<img src={facebook} alt="Facebook logoo"></img>
				</a>
				<a href="https://www.instagram.com">
					<img src={instagram} alt="Instagram logo"></img>
				</a>
				<a href="https://twitter.com">
					<img src={twitter} alt="Twitter logo"></img>
				</a>
				<a href="https://www.tiktok.com">
					<img src={tiktok} alt="Tiktok logo"></img>
				</a>
			</div>
		</div>
	);
};

export default Footer;
