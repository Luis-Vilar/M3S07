import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
import styles from "./listaUnidade.module.css";

export default function ListaUnidades({ mudarFormulario }) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch(`http://localhost:3000/api/v1/unidades`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.unidades);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarUnidade = () => console.log("editarUnidade");

  const removerUnidade = () => console.log("removerUnidade");

  return (
    <div>
      <h3 className={styles.titulo}>Lista de unidades</h3>
      <Table className={styles.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Apelido</th>
            <th>Local</th>
            <th>Marca</th>
            <th>Modelo</th>
          </tr>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nickname}</td>
              <td>{item.address}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>
                <Button
                  className={styles.btnverde}
                  variant="success"
                  onClick={() => editarUnidade(item.id)}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  className={styles.btnvermelho}
                  variant="danger"
                  onClick={() => removerUnidade(item.id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <div className={styles.divbtn}>
        <Button className={styles.btnazul} onClick={() => mudarFormulario()}>
          Nova Unidade
        </Button>
      </div>
    </div>
  );
}

ListaUnidades.propTypes = {
  mudarFormulario: PropTypes.func.isRequired,
};
