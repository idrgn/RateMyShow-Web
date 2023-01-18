import { Route, Routes } from "react-router-dom";
import "./App.css";
import ContainerHeader from "./screens/header/ContainerHeader";
import ContainerMenu from "./screens/menu/ContainerMenu";
import ContainerFooter from "./screens/footer/ContainerFooter";
import NotFound from "./screens/notFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContainerHeader />}>
        <Route path="/" element={<ContainerFooter />}>
          <Route path="/" element={<ContainerMenu />}></Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
