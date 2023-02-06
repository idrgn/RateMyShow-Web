import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./BestRated.css";

const BestRated = () => {
	// Creamos estado para almacenar la respuesta
	const [bestRated, setBestRated] = useState({ result: [] });
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);

	// Obtención de datos
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/best?page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setBestRated(response.data);
			setIsLoading(false);
		});
	}, [page]);

	const onPageChange = (event, value) => {
		if (page !== value) {
			setPage(value);
		}
	};

	return (
		<div className="general-body">
			<div className="general-title">Títulos Mejor Valorados</div>
			<div className="bestrated-result">{isLoading ? <Loading></Loading> : <TitleList titles={bestRated.result}></TitleList>}</div>
			<div className="bestrated-pagination">
				<Pagination count={bestRated.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default BestRated;
