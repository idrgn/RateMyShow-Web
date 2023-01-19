import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Latest.css";
import TitleListItem from "../../components/title_list_item/TitleListItem";

const Latest = (props) => {
  const params = useParams();

  // Creamos estado para almacenar la lista de títulos
  const [latest, setLatest] = useState([]);

  // Pedimos los datos a la API
  useEffect(() => {
    axios.get(`https://0ee0ee41-ff72-4ce8-a306-41b3a57f8eb0.mock.pstmn.io/latest`).then((response) => {
      setLatest(response.data);
    });
  }, []);

  // Función para convertir título a componente
  const latestToComponent = (l) => {
    return <TitleListItem latest={l} />;
  };

  return (
    <div className="latest">
      <div>
        <h1>Últimas Series</h1>
      </div>
      <div>{latest.map(latestToComponent)}</div>
    </div>
  );
};

export default Latest;
