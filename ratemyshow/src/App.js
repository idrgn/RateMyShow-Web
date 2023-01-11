import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./screens/NotFound";

function App() {
	return (
		<Routes>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
}

export default App;
