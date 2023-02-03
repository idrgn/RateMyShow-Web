import { Route, Routes } from "react-router-dom";
import "./App.css";
import BestRated from "./screens/best_rated/BestRated";
import FavoritesList from "./screens/favorites/FavoritesPending";
import FeedList from "./screens/feed/Feed";
import FollowerList from "./screens/followers/Followers";
import ContainerFooter from "./screens/footer/ContainerFooter";
import ContainerHeader from "./screens/header/ContainerHeader";
import Latest from "./screens/latest/Latest";
import Login from "./screens/login/Login";
import Logout from "./screens/logout/Logout";
import MainPage from "./screens/main_page/MainPage";
import ContainerMenu from "./screens/menu/ContainerMenu";
import NotFound from "./screens/not_found/NotFound";
import Ratings from "./screens/ratings/Ratings";
import Recommendations from "./screens/recommendations/Recommendations";
import Register from "./screens/register/Register";
import Search from "./screens/search/Search";
import TitleDetail from "./screens/title_detail/TitleDetail";
import Users from "./screens/users/Users";
import UserProfile from "./screens/user_profile/UserProfile";

function App() {
	return (
		<Routes>
			<Route path="" element={<ContainerHeader />}>
				<Route path="" element={<ContainerFooter />}>
					<Route path="" element={<ContainerMenu />}>
						<Route path="" element={<MainPage />}></Route>
						<Route path="register" element={<Register />}></Route>
						<Route path="login" element={<Login />}></Route>
						<Route path="users/:username" element={<UserProfile />}></Route>
						<Route path="users/:username/followers" element={<FollowerList following={false} />}></Route>
						<Route path="users/:username/following" element={<FollowerList following={true} />}></Route>
						<Route path="users/:username/ratings" element={<Ratings />}></Route>
						<Route path="favorites" element={<FavoritesList favorites={true} />}></Route>
						<Route path="pending" element={<FavoritesList favorites={false} />}></Route>
						<Route path="feed" element={<FeedList />}></Route>
						<Route path="latest" element={<Latest />}></Route>
						<Route path="recommendations" element={<Recommendations />}></Route>
						<Route path="search" element={<Search />}></Route>
						<Route path="titles/:id" element={<TitleDetail />}></Route>
						<Route path="best" element={<BestRated />}></Route>
						<Route path="logout" element={<Logout />}></Route>
						<Route path="users" element={<Users />}></Route>
					</Route>
				</Route>
			</Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
}

export default App;
