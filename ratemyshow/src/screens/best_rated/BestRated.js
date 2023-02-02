import { Pagination, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./BestRated.css";

const BestRated = () => {
	// Creamos estado para almacenar la respuesta
	const [bestRated, setBestRated] = useState({ result: [] });
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);

	// Obtención de datos
	useEffect(() => {
		axios
			.get(`http://api.ratemyshow.lekiam.net/best`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
			.then((response) => {
				setBestRated(response.data);
			})
			.finally(setIsLoading(false));
	}, []);

	const onPageChange = (event, value) => {
		if (page !== value - 1) {
			setPage(value - 1);
		}
	};

	return (
		<div className="bestrated-container">
			<div className="bestrated-title">
				<Typography variant="h2"> Títulos Mejor Valorados</Typography>
			</div>
			<div className="bestrated-result">{isLoading ? <Loading></Loading> : <TitleList titles={bestRated.result}></TitleList>}</div>
			<div className="bestrated-pagination" color="primary" size="large">
				<Pagination count={bestRated.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};

export default BestRated;
