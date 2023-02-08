import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import TitleList from "../../components/title_list/TitleList";
import "./Search.css";

/**
 * Pantalla de búsqueda de títulos
 * @returns
 */
const Search = () => {
	const [page, setPage] = useState(1);
	const [noResults, setNoResults] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState({ result: [] });

	// Se obtiene la query
	const search = searchParams.get("query");

	// Obtención de datos
	useEffect(() => {
		setIsLoading(true);
		setNoResults(false);
		axios
			.get(`http://api.ratemyshow.lekiam.net/titles?${search ? `query=${search}&` : ""}page=${page - 1}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } })
			.then((response) => {
				setSearchResults(response.data);
				setPage(response.data.current + 1);
				setNoResults(false);
				setIsLoading(false);
			})
			.catch((err) => {
				if ("response" in err) {
					if (err.response.status === 404) {
						setNoResults(true);
						setIsLoading(false);
					}
				}
			})
			.finally(() => {
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
			<div className="general-title" hidden={search === null}>
				Resultados de la búsqueda "{search}"
			</div>
			<div className="general-title" hidden={search !== null}>
				Títulos de RateMyShow
			</div>
			<div className="search-result" hidden={noResults && !isLoading}>
				{isLoading ? <Loading /> : <TitleList titles={searchResults.result}></TitleList>}
			</div>
			<div className="search-title" hidden={!noResults}>
				Sin resultados
			</div>
			<div className="search-pagination">
				<Pagination count={searchResults.pages} onChange={onPageChange} hidden={noResults || isLoading} color="primary" size="large" />
			</div>
		</div>
	);
};

export default Search;
