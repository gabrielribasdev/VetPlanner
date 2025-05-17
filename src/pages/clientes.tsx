import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Container, Info, Item, PaginationButton, PaginationWrapper,SearchInput, Title, Wrapper } from "../styles/lista-styles";

type Cliente = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: string | null;
};

const Clientes: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [search, setSearch] = useState<string>("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/cadastro/tutor/listar",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setClientes(data);
            } catch (err) {
                console.error("Erro ao buscar clientes", err);
            }
        };

        fetchClientes();
    }, []);

    const clientesFiltrados = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const clientesPaginados = clientesFiltrados.slice( indiceInicial, indiceFinal);

    const mudarPagina = (novaPagina: number) => {
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            setPaginaAtual(novaPagina);
        }
    };

    return (
        <Layout>
            <Container>
                <Title>Lista de Clientes</Title>

                <SearchInput
                    type="text"
                    placeholder="Buscar por nome..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPaginaAtual(1);
                    }}
                />

                {clientesPaginados.length > 0 ? (
                    clientesPaginados.map((cliente) => (
                        <Wrapper key={cliente.id}>
                            <Item>
                                <h3>{cliente.nome}</h3>
                                <Info>
                                    <strong>Email:</strong> {cliente.email}
                                </Info>
                                <Info>
                                    <strong>Telefone:</strong>{" "}
                                    {cliente.telefone}
                                </Info>
                                <Info>
                                    <strong>CPF:</strong> {cliente.cpf}
                                </Info>
                                <Info>
                                    <strong>Endereço:</strong>{" "}
                                    {cliente.endereco ?? "Não informado"}
                                </Info>
                            </Item>
                        </Wrapper>
                    ))
                ) : (
                    <p>Não há clientes para exibir.</p>
                )}

                {totalPaginas > 1 && (
                    <PaginationWrapper>
                        <PaginationButton
                            onClick={() => mudarPagina(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                        >
                            Anterior
                        </PaginationButton>
                        <span>
                            {paginaAtual} de {totalPaginas}
                        </span>
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

export default Clientes;
