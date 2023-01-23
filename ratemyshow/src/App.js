import { Route, Routes } from "react-router-dom";
import "./App.css";
import FollowerList from "./screens/followers/Followers";
import ContainerFooter from "./screens/footer/ContainerFooter";
import ContainerHeader from "./screens/header/ContainerHeader";
import Latest from "./screens/latest/Latest";
import MainPage from "./screens/main_page/MainPage";
import ContainerMenu from "./screens/menu/ContainerMenu";
import NotFound from "./screens/not_found/NotFound";
import Recommendations from "./screens/recommendations/Recommendations";
import UserProfile from "./screens/user_profile/UserProfile";
import Register from "./screens/register/Register";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ContainerHeader />}>
				<Route path="/" element={<ContainerFooter />}>
					<Route path="" element={<MainPage />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/" element={<ContainerMenu />}>
						<Route path="users/:username" element={<UserProfile />}></Route>
						<Route path="users/:username/followers" element={<FollowerList />}></Route>
						<Route path="latest" element={<Latest />}></Route>
						<Route path="/recommendations" element={<Recommendations />}></Route>
					</Route>
				</Route>
			</Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
}

export default App;
