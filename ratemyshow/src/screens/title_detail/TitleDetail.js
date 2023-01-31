import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TitleDetail = (props) => {
	const { username } = useParams();
	const params = useParams();

	const [titleData, setTitleData] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);

	// Pedimos los datos a la API
	useEffect(() => {
		axios.get(`http://api.ratemyshow.lekiam.net/titles/${params.username}`, { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			setTitleData(response.data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) return <div></div>;

	return (
		<div>
			<div id="datos"></div>
			<div id="rating-botones"></div>
			<div id="sinopsis"></div>
			<div id="comentar"></div>
			<div id="comentarios"></div>
		</div>
	);
};

export default TitleDetail;
