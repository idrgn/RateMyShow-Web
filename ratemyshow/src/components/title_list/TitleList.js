import Grid from "@mui/material/Grid";
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
			{props.titles.length ? props.titles.map(titlesToComponent) : <p>No hay datos</p>}
		</Grid>
	);
};

export default TitleList;
