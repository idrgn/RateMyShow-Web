import "./menu.css";
import avatar from "../../images/menu/avatar.jfif";
import logout from "../../images/menu/logout.png";
import lupa from "../../images/menu/lupa.png";

/**
 * Menú superior
 * @param {*} props
 * @returns
 */
const Menu = (props) => {
  return (
    <div className="menu">
      <div> </div>
      <div className="enlaces">
        <ul>
          <li>
            <a href="#" className="activo">
              &nbsp;Feed&nbsp;
            </a>
          </li>
          <li className="barra">|</li>
          <li>
            <a href="#">&nbsp; Mejor Calificadas &nbsp; </a>
          </li>
          <li className="barra">|</li>
          <li>
            <a href="#">&nbsp; Sugerencias &nbsp; </a>
          </li>
          <li className="barra">|</li>
          <li>
            <a href="#">&nbsp; Novedades &nbsp;</a>
          </li>
          <li className="barra">|</li>
          <li>
            <a href="#">&nbsp; Mi biblioteca &nbsp;</a>
            <ul className="dropdown-content">
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

      <div className="perfil">
        <a href="#">
          <img src={avatar}></img>
        </a>
      </div>

      <div>
        <form className="formMenu">
          <input type="search" className="browser2" placeholder="&nbsp;Buscar" />
          <img src={lupa} alt="lupa" className="input-icon"></img>
        </form>
      </div>

      <div className="logInOut">
        <a href="#">
          <img src={logout} alt="icono para cerrar sesión"></img>
        </a>
      </div>
    </div>
  );
};

export default Menu;
