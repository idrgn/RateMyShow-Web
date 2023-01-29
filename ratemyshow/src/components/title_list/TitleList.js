import Grid from "@material-ui/core/Grid";
import TitleListItem from "../title_list_item/TitleListItem";
import "./TitleList.css";

const TitleList = (props) => {
	const titlesToComponent = (t) => {
		return (
			<Grid item>
				<TitleListItem title={t} />
			</Grid>
		);
	};

	return (
		<Grid container spacing={5} justifyContent="center" className="titlelist-grid-container">
			{props.titles.map(titlesToComponent)}
		</Grid>
	);
};

export default TitleList;
