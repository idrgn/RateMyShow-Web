import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleListItem from "../title_list_item/TitleListItem";
import "./TitleList.css";

/**
 * Lista que contiene datos de N títulos
 * @param {*} props
 * @returns
 */
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
			{props.titles.length ? (
				props.titles.map(titlesToComponent)
			) : (
				<Grid item>
					<Typography>No hay datos</Typography>
				</Grid>
			)}
		</Grid>
	);
};

export default TitleList;
