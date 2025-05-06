import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/layout/layout";

type Cliente = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: string | null;
};

// Estilos usando styled-components
const Title = styled.h1`
    color: #38FF9F;
    font-size: 2rem;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const ClienteWrapper = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: #081D40;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const ClienteItem = styled.div`
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

const Clientes: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/api/cadastro/tutor/listar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setClientes(data);
            } catch (err) {
                console.error("Erro ao buscar clientes", err);
            }
        };

        fetchClientes();
    }, []);

    // Filtrando os clientes de acordo com a busca
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <Title>Lista de Clientes</Title>

            {/* Campo de busca */}
            <SearchInput
                type="text"
                placeholder="Buscar por nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Lista de Clientes */}
            <div>
                {clientesFiltrados.length > 0 ? (
                    clientesFiltrados.map((cliente) => (
                        <ClienteWrapper key={cliente.id}>
                                <h3>{cliente.nome}</h3>
                                <p><strong>Email:</strong> {cliente.email}</p>
                                <p><strong>Telefone:</strong> {cliente.telefone}</p>
                                <p><strong>CPF:</strong> {cliente.cpf}</p>
                                <p><strong>Endereço:</strong> {cliente.endereco ? cliente.endereco : "Não informado"}</p>
                        </ClienteWrapper>
                    ))
                ) : (
                    <p>Não há clientes para exibir.</p>
                )}
            </div>
        </Layout>
    );
};

export default Clientes;
