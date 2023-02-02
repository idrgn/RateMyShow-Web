import { CircularProgress } from "@mui/material";
import "./Loading.css";

const Loading = () => {
	return (
		<div className="loading-container">
			<CircularProgress size="20vh"></CircularProgress>
		</div>
	);
};

export default Loading;
