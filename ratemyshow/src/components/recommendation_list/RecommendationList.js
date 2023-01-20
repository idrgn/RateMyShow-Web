import TitleListItem from "../title_list_item/TitleListItem";
import "../../screens/recommendations/Recommendations.css";
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
    <div className="recommendationList">
      <div className="genreRecomendations">{props.recommendations.genre}</div>
      <div className="titlesRecomendations">{props.recommendations.titles.map(recommendationsToComponent)}</div>
    </div>
  );
};

export default RecommendationList;
