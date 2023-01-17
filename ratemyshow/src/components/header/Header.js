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
      <img className="banner" src={banner} alt=""></img>
    </div>
  );
};

export default Menu;
