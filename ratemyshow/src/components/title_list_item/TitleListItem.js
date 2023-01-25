/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const TitleListItem = (props) => {
	return (
		<div>
			<img src={props.title.cover}></img>
			<h3>{props.title.title}</h3>
			<p>{props.title.year}</p>
		</div>
	);
};

export default TitleListItem;
