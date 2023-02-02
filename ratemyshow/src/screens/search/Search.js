import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./Search.css";

const Search = () => {
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState({ result: [] });

	// Se obtiene la query
	const search = searchParams.get("query");

	// Obtención de datos
	useEffect(() => {
		setIsLoading(true);
		axios.get(`http://api.ratemyshow.lekiam.net/titles?query=${search}&page=${page}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setSearchResults(response.data);
			setPage(response.data.current);
			setIsLoading(false);
		});
	}, [page, search]);

	const onPageChange = (event, value) => {
		if (page !== value - 1) {
			setPage(value - 1);
		}
	};

	return (
		<div className="search-container">
			<div className="search-title">Resultados de la búsqueda "{search}"</div>
			<div className="search-result">{isLoading ? <Loading /> : <TitleList titles={searchResults.result}></TitleList>}</div>
			<div className="search-pagination" color="primary" size="large">
				<Pagination count={searchResults.pages} onChange={onPageChange} />
			</div>
		</div>
	);
};

export default Search;
