import axios from "axios";
import { useEffect, useState } from "react";

export default function dadosLacamentos() {
  const [mediaConsumo, setMediaConsumo] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const token = localStorage.getItem("token");

  const urlLancamento = "http://localhost:3000/api/v1/geracao";

  useEffect(() => {
    async function fetchLancamentos() {
      try {
        const response = await axios.get(urlLancamento, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        console.log(response.data);
        setCarregando(false);
        setMediaConsumo(
          parseFloat(
            response.data
              .map((lancamentos) => lancamentos.total)
              .reduce((a, b) => a + b, 0) / response.data.length
          ).toFixed(0)
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchLancamentos();
  }, []);
  return { mediaConsumo };
}
