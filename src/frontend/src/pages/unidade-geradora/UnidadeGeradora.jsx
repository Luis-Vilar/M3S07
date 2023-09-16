import ListaUnidades from "../../components/listaUnidades/listaUnidades";
import { CadastroUnidade } from "../../components/cadastroUnidade/Cadastro";
import { useState } from "react";

export const UnidadeGeradora = () => {
  const [renderizarCadastroUnidade, setRenderizarCadastroUnidade] =
    useState(false);

  const mudarFormulario = () => {
    setRenderizarCadastroUnidade(!renderizarCadastroUnidade);
  };

  return renderizarCadastroUnidade ? (
    <CadastroUnidade mudarFormulario={mudarFormulario} />
  ) : (
    <>
      
      <ListaUnidades mudarFormulario={mudarFormulario} />
    </>
  );
};
