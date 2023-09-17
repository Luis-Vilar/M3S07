import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Lancamento-mensal.module.css";

export const LancamentoGeracaoMensal = () => {
  const [unidades, setUnidades] = useState([]);
  const [unidadeGeradora, setUnidadeGeradora] = useState("");
  const [data, setData] = useState("");
  const [total, setTotal] = useState("");
  const [formulario, setFormulario] = useState(false);
  const lancamento = {
    unidade_id: unidadeGeradora,
    reference_date: data,
    total_generated: total,
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/unidades", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        setUnidades([...response.data.unidades]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validar = () => {
    if (unidadeGeradora && data && total) {
      setFormulario(true);
    } else {
      setFormulario(false);
    }
  };

  useEffect(() => {
    validar();
  }, [unidadeGeradora, data, total]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formulario) {
      console.log(lancamento);
      axios
        .post("http://localhost:3000/api/v1/geracao", lancamento, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((response) => {
          alert("Lançamento realizado com sucesso!");
          limparCampos();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  function limparCampos() {
    setUnidadeGeradora("");
    setData("");
    setTotal("");
  }

  return (
    <div className={styles.formulario}>
      <form onSubmit={handleSubmit}>
        <div className={styles.gridContainer}>
          <div className={styles.unidade}>
            <label>Unidade Geradora</label>
            <select
              name=""
              id=""
              value={unidadeGeradora}
              onChange={(e) => setUnidadeGeradora(e.target.value)}
            >
              <option value="">Escolha a unidade</option>
              {unidades.map((unidade) => (
                <option key={unidade.id} value={unidade.id}>
                  {unidade.nickname}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.data}>
            <label htmlFor="">Mês/ano</label>
            <input
              type="month"
              name="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className={styles.total}>
            <label htmlFor="">Total kw gerado</label>
            <input
              type="number"
              name="kw"
              value={total}
              onChange={(e) => setTotal(e.target.valueAsNumber)}
            />
          </div>
          <div className={styles.botao}>
            <button type="submit" className="btn btn-primary">
              Cadastro
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
