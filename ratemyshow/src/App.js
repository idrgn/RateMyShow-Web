import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./screens/notFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
