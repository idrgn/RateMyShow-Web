import "./Menu.css";
import avatar from "../../images/menu/avatar.jfif";
import logout from "../../images/menu/logout.png";
import lupa from "../../images/menu/lupa.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Menú superior
 * @param {*} props
 * @returns
 */
const Menu = (props) => {
  const params = useParams();
  const [username, setUsername] = useState(params.username);

  return (
    <div className="menu">
      <div> </div>
      <div className="menu-links">
        <ul>
          <li>
            <a href="#" className="activo">
              &nbsp;Feed&nbsp;
            </a>
          </li>
          <li className="menu-separator">|</li>
          <li>
            <a href="#">&nbsp; Mejor Calificadas &nbsp; </a>
          </li>
          <li className="menu-separator">|</li>
          <li>
            <a href="#">&nbsp; Sugerencias &nbsp; </a>
          </li>
          <li className="menu-separator">|</li>
          <li>
            <a href="#">&nbsp; Novedades &nbsp;</a>
          </li>
          <li className="menu-separator">|</li>
          <li>
            <a href="#">&nbsp; Mi biblioteca &nbsp;</a>
            <ul className="menu-dropdown-content">
              <li>
                <a href="#">Favoritas</a>
              </li>
              <li>
                <a href="#">Pendientes</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="menu-profile">
        <Link to={`/users/${username}`}>
          <img src={avatar} alt="avatar" className="menu-avatar" />
        </Link>
      </div>

      <div>
        <form className="menu-form">
          <input type="search" className="menu-browser" placeholder="&nbsp;Buscar" />
          <img src={lupa} alt="lupa" className="menu-input-icon"></img>
        </form>
      </div>

      <div className="menu-log-in-out">
        <a href="#">
          <img src={logout} alt="icono para cerrar sesión"></img>
        </a>
      </div>
    </div>
  );
};

export default Menu;
