import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/layout/layout";

type Agendamento = {
    pet: string;
    servico: string;
    data: string;
    horario: string;
    preco: string;
};

// Estilos usando styled-components
const Container = styled.div`
    padding: 20px;
    background-color: #f8f8f8;
    color: #333;
`;

const Title = styled.h1`
    color: #38FF9F;
    font-size: 2rem;
    margin-bottom: 20px;
`;

const Select = styled.select`
    background-color: #38FF9F;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    border: none;
    font-size: 1rem;
`;

const AgendamentoWrapper = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: #081D40;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const AgendamentoItem = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    background-color: #38FF9F;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);

    h3 {
        color: #fff;
    }

    p {
        color: #fff;
        font-size: 1rem;
    }
`;

const Historico: React.FC = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [filtroServico, setFiltroServico] = useState<string>("");  // Filtro por serviço
    const [filtroPet, setFiltroPet] = useState<string>("");  // Filtro por pet

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/api/agendamentos/listar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setAgendamentos(data);
            } catch (err) {
                console.error("Erro ao buscar agendamentos", err);
            }
        };

        fetchAgendamentos();
    }, []);

    const agendamentosFiltrados = agendamentos.filter((agendamento) => {
        const filtroPorServico = filtroServico ? agendamento.servico === filtroServico : true;
        const filtroPorPet = filtroPet ? agendamento.pet === filtroPet : true;
        return filtroPorServico && filtroPorPet;
    });

    return (
        <Layout>
            <Title>Histórico de Agendamentos</Title>

            {/* Filtros */}
            <div>
                <Select
                    value={filtroServico}
                    onChange={(e) => setFiltroServico(e.target.value)}
                >
                    <option value="">Filtrar por Serviço</option>
                    {/* Aqui você pode listar os serviços diretamente se tiver esses dados */}
                    <option value="Banho">Banho</option>
                    <option value="Vacinação">Vacinação</option>
                </Select>

                <Select
                    value={filtroPet}
                    onChange={(e) => setFiltroPet(e.target.value)}
                >
                    <option value="">Filtrar por Pet</option>
                    {/* Aqui você pode listar os pets diretamente se tiver esses dados */}
                    <option value="Rex">Rex</option>
                    <option value="batata">Batata</option>
                </Select>
            </div>

            {/* Lista de Agendamentos */}
            <div>
                {agendamentosFiltrados.length > 0 ? (
                    agendamentosFiltrados.map((agendamento, index) => (
                        <AgendamentoWrapper key={index}>
                                <h3>{agendamento.pet} - {agendamento.servico}</h3>
                                <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString()}</p>
                                <p><strong>Horário:</strong> {agendamento.horario}</p>
                                <p><strong>Preço:</strong> R${agendamento.preco}</p>
                        </AgendamentoWrapper>
                    ))
                ) : (
                    <p>Não há agendamentos para exibir.</p>
                )}
            </div>
        </Layout>
    );
};

export default Historico;
