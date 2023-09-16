import axios from "axios";
import { useEffect, useState } from "react";

export default function dadosUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [unidadesAtivas, setUnidadesAtivas] = useState([]);
  const [unidadeInativa, setUnidadeInativa] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const token = localStorage.getItem("token");

  const urlUnidades = "http://localhost:3000/api/v1/unidades";

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await axios.get(urlUnidades, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setUnidades(response.data.unidades);
        setCarregando(false);
        setUnidadesAtivas(
          response.data.unidades.filter((unidade) => unidade.ativa === false)
        );
        setUnidadeInativa(
          response.data.unidades.filter((unidade) => unidade.ativa === true)
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchUnidades();
  }, []);

  return { unidades, unidadesAtivas, unidadeInativa };
}
