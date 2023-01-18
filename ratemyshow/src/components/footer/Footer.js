import "./footer.css";
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
    <div className="pie">
      <div className="enlaces2">
        <a href="#">Términos y condiciones</a>
        <a href="#">Políticas de privacidad</a>
        <a href="#">© RateMyShow.com</a>
      </div>

      <div className="iconos">
        <a href="#">
          <img src={facebook}></img>
        </a>
        <a href="#">
          <img src={instagram}></img>
        </a>
        <a href="#">
          <img src={twitter}></img>
        </a>
        <a href="#">
          <img src={tiktok}></img>
        </a>
      </div>
    </div>
  );
};

export default Footer;
