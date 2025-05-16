import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Container, Info, Item, PaginationButton, PaginationWrapper, SearchInput, Title, Wrapper } from "../styles/lista-styles";

type Animal = {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    peso: number;
};

const Pacientes: React.FC = () => {
    const [animais, setAnimais] = useState<Animal[]>([]);
    const [search, setSearch] = useState<string>("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    useEffect(() => {
        const fetchAnimais = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/cadastro/animal/listar",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setAnimais(data);
            } catch (err) {
                console.error("Erro ao buscar animais", err);
            }
        };

        fetchAnimais();
    }, []);

    const animaisFiltrados = animais.filter((animal) => animal.nome.toLowerCase().includes(search.toLowerCase()));
    const totalPaginas = Math.ceil(animaisFiltrados.length / itensPorPagina);
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const animaisPaginados = animaisFiltrados.slice(indiceInicial, indiceFinal);

    const mudarPagina = (novaPagina: number) => {
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            setPaginaAtual(novaPagina);
        }
    };

    return (
        <Layout>
            <Container>
                <Title>Lista de Pacientes</Title>

                <SearchInput
                    type="text"
                    placeholder="Buscar por nome..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPaginaAtual(1); 
                    }}
                />

                {animaisPaginados.length > 0 ? (
                    animaisPaginados.map((animal) => (
                        <Wrapper key={animal.id}>
                            <Item>
                                <h3>{animal.nome}</h3>
                                <Info>
                                    <strong>Espécie:</strong> {animal.especie}
                                </Info>
                                <Info>
                                    <strong>Raça:</strong> {animal.raca}
                                </Info>
                                <Info>
                                    <strong>Idade:</strong> {animal.idade} anos
                                </Info>
                                <Info>
                                    <strong>Peso:</strong> {animal.peso} kg
                                </Info>
                            </Item>
                        </Wrapper>
                    ))
                ) : (
                    <p>Não há animais para exibir.</p>
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

export default Pacientes;
