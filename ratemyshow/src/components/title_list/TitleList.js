import Grid from "@material-ui/core/Grid";
import TitleListItem from "../title_list_item/TitleListItem";
import "./TitleList.css";

const TitleList = (props) => {
	const titlesToComponent = (t) => {
		return (
			<Grid item xs={12} sm={6} md={2}>
				<TitleListItem title={t} />
			</Grid>
		);
	};

	return (
		<Grid container spacing={1} justifyContent="center" className="gc">
			{props.titles.map(titlesToComponent)}
		</Grid>
	);
};

export default TitleList;
