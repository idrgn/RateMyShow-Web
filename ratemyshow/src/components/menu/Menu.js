import "./menu.css";
import avatar from "../../images/menu/avatar.jfif";
import logout from "../../images/menu/logout.png";

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
          <li className="dropdown">
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

      <div className="browser">
        <form>
          <input type="search" className="browser2" placeholder="&nbsp;Buscar"></input>
          <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </form>
      </div>

      <div className="logInOut">
        <a href="#">
          <img src={logout} alt=""></img>
        </a>
      </div>
    </div>
  );
};

export default Menu;
