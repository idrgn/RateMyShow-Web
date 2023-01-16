/**
 * Menú superior
 * @param {*} props
 * @returns
 */
const Menu = (props) => {
	return (
		<div>
			<div>
				<div className="links">
					<a href="#/">Feed</a> | <a href="#/">Mejor Calificadas</a> | <a href="#/">Sugerencias</a> | <a href="#/">Novedades</a> | <a href="#/">Mi biblioteca</a>
				</div>
				<div className="browser">
					<form>
						<input type="search"></input>
					</form>
				</div>
				<div className="logInOut">
					<button type="button">Cerrar sesión</button>
				</div>
			</div>
		</div>
	);
};

export default Menu;
