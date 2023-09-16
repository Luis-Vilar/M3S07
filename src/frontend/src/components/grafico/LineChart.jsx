import "./LineChart.css";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

export const LineChart = () => {
  const [listaUnidades, setListaUnidades] = useState([]);
  const [listaLancamentos, setListaLancamentos] = useState([]);
  const token = localStorage.getItem("token");

  // Realiza a busca dos dados ao carregar a página
  useEffect(() => {
    buscaUnidades();
    buscaListaLancamentos();
  }, []);

  // Faz a busca de informações no endpoint unidades
  const buscaUnidades = () => {
    axios
      .get("http://localhost:3000/api/v1/unidades", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => setListaUnidades(response.data.unidades))
      .catch((error) => alert(error));
  };

  // Faz a busca de informações no endpoint lancamentos
  const buscaListaLancamentos = () => {
    axios
      .get("http://localhost:3000/api/v1/geracao",{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => setListaLancamentos(response.data))
      .catch((error) => alert(error));
    console.log(listaLancamentos);
  };

  // Lógica para cálculo dos dados do gráfico
  const unidadesAtivas = listaUnidades.filter(
    (unidade) => unidade.active == true
  );

  // Passa os dados do array para o objeto que vai conter os dados do gráfico
  let somaLancamentos = {};
  listaLancamentos.forEach((element) => {
    let estaAtiva = false;
    Object.values(unidadesAtivas).forEach((unidade) => {
      if (unidade.id === element.unidade_id) {
        estaAtiva = true;
      }
    });

    //
    if (estaAtiva) {
      if (somaLancamentos[element.reference_date]) {
        somaLancamentos[element.reference_date] += element.total_generated;
      } else {
        somaLancamentos[element.reference_date] = element.total_generated;
      }
    }

    // Caso o tamanho do objeto seja maior que 12 retira o mês mais antigo
    if (Object.keys(somaLancamentos).length > 12) {
      delete somaLancamentos[Object.keys(somaLancamentos)[0]];
    }
  });

  // Criação do Gráfico
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip
  );

  // Declaração dos dados usados e configurações visuais do gráfico
  const labels = Object.keys(somaLancamentos).map((key) => key);
  const data = {
    labels,
    datasets: [
      {
        label: "Total de energia gerada por mês",
        data: Object.values(somaLancamentos).map((value) => value),
        backgroundColor: "white",
        borderColor: "aqua",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        onClick: false,
        align: "start",
        labels: {
          boxWidth: 0,
          font: {
            size: 30,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        position: "right",
      },
    },
  };

  return (
    <div id="lineChart">
      <Line options={options} data={data} />
    </div>
  );
};
