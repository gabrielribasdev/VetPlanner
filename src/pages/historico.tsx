import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Container, Title, Wrapper, Item, Info, Select, PaginationWrapper, PaginationButton, PageIndicator } from "../styles/lista-styles";

type Agendamento = {
    pet: string;
    servico: string;
    data: string;
    horario: string;
    preco: string;
};

const ITENS_POR_PAGINA = 5;

const Historico: React.FC = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [filtroServico, setFiltroServico] = useState("");
    const [filtroPet, setFiltroPet] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/agendamentos/listar",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setAgendamentos(data);
            } catch (err) {
                console.error("Erro ao buscar agendamentos", err);
            }
        };

        fetchAgendamentos();
    }, []);

    useEffect(() => {
        setPaginaAtual(1);
    }, [filtroServico, filtroPet]);

    const agendamentosFiltrados = agendamentos.filter((agendamento) => {
        const filtroPorServico = filtroServico
            ? agendamento.servico === filtroServico
            : true;
        const filtroPorPet = filtroPet ? agendamento.pet === filtroPet : true;
        return filtroPorServico && filtroPorPet;
    });

    const totalPaginas = Math.ceil(
        agendamentosFiltrados.length / ITENS_POR_PAGINA
    );
    const inicioIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fimIndex = inicioIndex + ITENS_POR_PAGINA;
    const agendamentosPaginados = agendamentosFiltrados.slice(
        inicioIndex,
        fimIndex
    );

    const mudarPagina = (novaPagina: number) => {
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            setPaginaAtual(novaPagina);
        }
    };

    return (
        <Layout>
            <Container>
                <Title>Histórico de Agendamentos</Title>

                <Wrapper>
                    <Select
                        value={filtroServico}
                        onChange={(e) => setFiltroServico(e.target.value)}
                    >
                        <option value="">Filtrar por Serviço</option>
                        <option value="Banho">Banho</option>
                        <option value="Vacinação">Vacinação</option>
                    </Select>

                    <Select
                        value={filtroPet}
                        onChange={(e) => setFiltroPet(e.target.value)}
                    >
                        <option value="">Filtrar por Pet</option>
                        <option value="Rex">Rex</option>
                        <option value="batata">Batata</option>
                    </Select>
                </Wrapper>

                {agendamentosFiltrados.length > 0 ? (
                    agendamentosPaginados.map((agendamento, index) => (
                        <Wrapper key={index}>
                            <Item>
                                <h3>
                                    {agendamento.pet} - {agendamento.servico}
                                </h3>
                                <Info>
                                    <strong>Data:</strong>{" "}
                                    {new Date(
                                        agendamento.data
                                    ).toLocaleDateString()}
                                </Info>
                                <Info>
                                    <strong>Horário:</strong>{" "}
                                    {agendamento.horario}
                                </Info>
                                <Info>
                                    <strong>Preço:</strong> R${" "}
                                    {parseFloat(agendamento.preco).toFixed(2)}
                                </Info>
                            </Item>
                        </Wrapper>
                    ))
                ) : (
                    <p>Não há agendamentos para exibir.</p>
                )}

                {totalPaginas > 1 && (
                    <PaginationWrapper>
                        <PaginationButton
                            onClick={() => mudarPagina(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                        >
                            Anterior
                        </PaginationButton>
                        <PageIndicator>
                            Página {paginaAtual} de {totalPaginas}
                        </PageIndicator>
                        <PaginationButton
                            onClick={() => mudarPagina(paginaAtual + 1)}
                            disabled={paginaAtual === totalPaginas}
                        >
                            Próxima
                        </PaginationButton>
                    </PaginationWrapper>
                )}
            </Container>
        </Layout>
    );
};

export default Historico;
