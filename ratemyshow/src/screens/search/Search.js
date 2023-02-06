import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./Search.css";

const Search = () => {
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState({ result: [] });

	// Se obtiene la query
	const search = searchParams.get("query");
	console.log(search);

	// Obtención de datos
	useEffect(() => {
		setIsLoading(true);
		axios.get(`http://api.ratemyshow.lekiam.net/titles?${search ? `query=${search}&` : ""}page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setSearchResults(response.data);
			setPage(response.data.current);
			setIsLoading(false);
		});
	}, [page, search]);

	const onPageChange = (event, value) => {
		if (page !== value) {
			setPage(value);
		}
	};

	return (
		<div className="search-container">
			<div className="search-title" hidden={search === null}>
				Resultados de la búsqueda "{search}"
			</div>
			<div className="search-title" hidden={search !== null}>
				Títulos de RateMyShow
			</div>
			<div className="search-result">{isLoading ? <Loading /> : <TitleList titles={searchResults.result}></TitleList>}</div>
			<div className="search-pagination">
				<Pagination count={searchResults.pages} onChange={onPageChange} color="primary" size="large" />
			</div>
		</div>
	);
};

export default Search;
