import TitleListItem from "../title_list_item/TitleListItem";
/**
 * Representa un título de una lista de títulos
 * @param {*} props
 * @returns
 */
const RecommendationList = (props) => {
  const recommendationsToComponent = (u) => {
    return <TitleListItem title={u} />;
  };
  return (
    <div>
      <div>{props.recommendations.genre}</div>
      <div>{props.recommendations.titles.map(recommendationsToComponent)}</div>
    </div>
  );
};

export default RecommendationList;
