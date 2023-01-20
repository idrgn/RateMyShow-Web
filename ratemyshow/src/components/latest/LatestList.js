/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const LatestList = (props) => {
  return (
    <div>
      <h3>{props.latest.title}</h3>
      <p>Año: {props.latest.year}</p>
      <p>Puntuación: {props.latest.rating}</p>
    </div>
  );
};

export default LatestList;
