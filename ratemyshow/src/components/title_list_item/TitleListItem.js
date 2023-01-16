/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const TitleListItem = (props) => {
	return (
		<div>
			<h3>{props.title.title}</h3>
			<p>{props.title.year}</p>
			<p>{props.title.dateAdded}</p>
		</div>
	);
};

export default TitleListItem;
