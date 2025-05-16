import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import {
  BotaoSubmit,
  FichaContainer,
  FieldsetEstilo,
  FormEstilo,
  GridCampos,
  InputEstilo,
  LegendEstilo,
  TituloFicha,
} from "../styles/cadastros-style";

import styled, { keyframes } from "styled-components";

const toastShow = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  10% {
    opacity: 1;
    transform: translateX(0);
  }
  90% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const Toast = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "success" ? "#4CAF50" : "#F44336"};
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  animation: ${toastShow} 3s forwards;
  z-index: 9999;
`;

const Vacinas: React.FC = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [marca, setMarca] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const isValid =
    nome.trim() !== "" &&
    preco.trim() !== "" &&
    marca.trim() !== "" &&
    periodo.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    const vacinaData = {
      nome,
      preco,
      marca,
      periodo,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/vacinas/salvar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vacinaData),
      });

      if (response.ok) {
        setToast({ message: "Vacina cadastrada com sucesso!", type: "success" });
        setNome("");
        setPreco("");
        setMarca("");
        setPeriodo("");
      } else {
        setToast({ message: "Erro ao cadastrar vacina.", type: "error" });
        console.error("Erro ao cadastrar vacina:", response.statusText);
      }
    } catch (error) {
      setToast({ message: "Erro na requisição.", type: "error" });
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <Layout>
      <FichaContainer>
        <TituloFicha>Cadastro de Vacina</TituloFicha>
        <FormEstilo onSubmit={handleSubmit}>
          <FieldsetEstilo>
            <LegendEstilo>Informações da Vacina</LegendEstilo>
            <GridCampos>
              <InputEstilo
                type="text"
                placeholder="Nome da vacina"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <InputEstilo
                type="number"
                placeholder="Preço"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
              <InputEstilo
                type="text"
                placeholder="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
              <InputEstilo
                type="text"
                placeholder="Período (ex: 6 meses)"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                required
              />
            </GridCampos>
          </FieldsetEstilo>
          <BotaoSubmit
                type="submit"
                disabled={!isValid || loading}
                isValid={isValid}
                loading={loading}
            >
                {loading ? <div className="spinner" /> : "Cadastrar"}
            </BotaoSubmit>
        </FormEstilo>

        {toast && <Toast type={toast.type}>{toast.message}</Toast>}
      </FichaContainer>
    </Layout>
  );
};

export default Vacinas;
