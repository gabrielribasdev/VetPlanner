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
    SelectEstilo,
    TituloFicha,
} from "../styles/cadastros-style";

import styled, { keyframes } from "styled-components";

type Servico = {
    id: number;
    nome: string;
    duracao: string;
    preco: string;
    observacao: string;
};

type Pet = {
    id: number;
    nome: string;
};

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

const Agendamentos: React.FC = () => {
    const [agendamento, setAgendamento] = useState({
        pet: "",
        servico: "",
        data: "",
        horario: "",
        preco: "",
        observacao: "",
    });

    const [servicos, setServicos] = useState<Servico[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/cadastro/pet/listar",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setPets(data);
            } catch (err) {
                console.error("Erro ao buscar pets", err);
            }
        };

        const fetchServicos = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/servicos/listar",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setServicos(data);
            } catch (err) {
                console.error("Erro ao buscar serviços", err);
            }
        };

        fetchPets();
        fetchServicos();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "servico") {
            const servicoSelecionado = servicos.find(
                (s) => s.id === parseInt(value)
            );
            setAgendamento((prev) => ({
                ...prev,
                servico: value,
                preco: servicoSelecionado ? servicoSelecionado.preco : "",
                observacao: servicoSelecionado
                    ? servicoSelecionado.observacao
                    : "",
            }));
        } else {
            setAgendamento({
                ...agendamento,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const agendamentoData = {
            pet: agendamento.pet,
            servico_id: parseInt(agendamento.servico),
            data: agendamento.data,
            horario: agendamento.horario,
            preco: agendamento.preco,
        };

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                "http://127.0.0.1:8000/api/agendamentos/salvar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(agendamentoData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Agendamento realizado com sucesso:", data);

                setAgendamento({
                    pet: "",
                    servico: "",
                    data: "",
                    horario: "",
                    preco: "",
                    observacao: "",
                });

                setToast({ message: "Agendamento realizado com sucesso!", type: "success" });
            } else {
                setToast({ message: "Erro ao salvar agendamento.", type: "error" });
                console.error(
                    "Erro ao salvar agendamento:",
                    response.statusText
                );
            }
        } catch (err) {
            setToast({ message: "Erro na requisição.", type: "error" });
            console.error("Erro na requisição:", err);
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

    const isFormValid = Object.values(agendamento).every(
        (value) => value.trim() !== ""
    );

    return (
        <Layout>
            <FichaContainer>
                <TituloFicha>Ficha de Agendamento de Serviço</TituloFicha>
                <FormEstilo onSubmit={handleSubmit}>
                    <FieldsetEstilo>
                        <LegendEstilo>Informações do Agendamento</LegendEstilo>
                        <GridCampos>
                            <SelectEstilo
                                name="pet"
                                value={agendamento.pet}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione um Pet</option>
                                {pets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>
                                        {pet.nome}
                                    </option>
                                ))}
                            </SelectEstilo>
                            <SelectEstilo
                                name="servico"
                                value={agendamento.servico}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione um serviço</option>
                                {servicos.map((servico) => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome}
                                    </option>
                                ))}
                            </SelectEstilo>
                            <InputEstilo
                                type="date"
                                name="data"
                                value={agendamento.data}
                                onChange={handleChange}
                                required
                            />
                            <InputEstilo
                                type="time"
                                name="horario"
                                value={agendamento.horario}
                                onChange={handleChange}
                                required
                            />
                            <InputEstilo
                                type="text"
                                name="preco"
                                placeholder="Preço"
                                value={agendamento.preco}
                                onChange={handleChange}
                                required
                            />
                            <InputEstilo
                                type="text"
                                name="observacao"
                                placeholder="Observação"
                                value={agendamento.observacao}
                                onChange={handleChange}
                                required
                            />
                        </GridCampos>
                    </FieldsetEstilo>
                    <BotaoSubmit
                        type="submit"
                        disabled={!isFormValid || loading}
                        isValid={isFormValid}
                        loading={loading}
                    >
                        {loading ? <div className="spinner" /> : "Agendar"}
                    </BotaoSubmit>
                </FormEstilo>

                {toast && <Toast type={toast.type}>{toast.message}</Toast>}
            </FichaContainer>
        </Layout>
    );
};

export default Agendamentos;
