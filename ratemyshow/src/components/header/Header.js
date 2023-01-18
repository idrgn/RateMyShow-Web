import "./header.css";
import banner from "../../images/header/banner.gif";

/**
 * Header superior
 * @param {*} props
 * @returns
 */
const Menu = (props) => {
  return (
    <div className="header">
      <img className="banner" src={banner} alt="banner de la página web"></img>
    </div>
  );
};

export default Menu;
