import { Route, Routes } from "react-router-dom";
import "./App.css";
import FollowerList from "./screens/followers/Followers";
import ContainerHeader from "./screens/header/ContainerHeader";
import ContainerMenu from "./screens/menu/ContainerMenu";
import NotFound from "./screens/notFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContainerHeader />}>
        <Route path="/" element={<ContainerMenu />}>
          <Route path="users/:username/followers" element={<FollowerList />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
