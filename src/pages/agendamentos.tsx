import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";

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

const Agendamentos: React.FC = () => {
    const [agendamento, setAgendamento] = useState({
        pet: "",
        servico: "",
        data: "",
        horario: "",
        preco: "",
        observacao: ""
    });

    const [servicos, setServicos] = useState<Servico[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);  // Estado para armazenar os pets
    const [loading, setLoading] = useState(false);  // Estado para controle do spinner

    useEffect(() => {
        // Buscar os pets
        const fetchPets = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/api/cadastro/pet/listar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setPets(data);  // Preencher a lista de pets
            } catch (err) {
                console.error("Erro ao buscar pets", err);
            }
        };

        // Buscar serviços
        const fetchServicos = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/api/servicos/listar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setServicos(data);  // Preencher a lista de serviços
            } catch (err) {
                console.error("Erro ao buscar serviços", err);
            }
        };

        fetchPets();  // Chamar função para buscar os pets
        fetchServicos();  // Chamar função para buscar os serviços
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "servico") {
            const servicoSelecionado = servicos.find((s) => s.id === parseInt(value));
            setAgendamento((prev) => ({
                ...prev,
                servico: value,
                preco: servicoSelecionado ? servicoSelecionado.preco : "",
                observacao: servicoSelecionado ? servicoSelecionado.observacao : ""
            }));
        } else {
            setAgendamento({
                ...agendamento,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);  // Ativa o spinner

        const agendamentoData = {
            pet: agendamento.pet,
            servico_id: parseInt(agendamento.servico),
            data: agendamento.data,
            horario: agendamento.horario,
            preco: agendamento.preco
        };

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://127.0.0.1:8000/api/agendamentos/salvar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(agendamentoData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Agendamento realizado com sucesso:", data);
                
                // Limpar os campos após sucesso
                setAgendamento({
                    pet: "",
                    servico: "",
                    data: "",
                    horario: "",
                    preco: "",
                    observacao: ""
                });
            } else {
                console.error("Erro ao salvar agendamento:", response.statusText);
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
        } finally {
            setLoading(false);  // Desativa o spinner após a requisição
        }
    };

    const isFormValid = Object.values(agendamento).every(value => value.trim() !== "");

    return (
        <Layout>
            <div style={fichaContainer}>
                <h1 style={tituloFicha}>Ficha de Agendamento de Serviço</h1>
                <form onSubmit={handleSubmit} style={formEstilo}>
                    <fieldset style={fieldsetEstilo}>
                        <legend style={legendEstilo}>Informações do Agendamento</legend>
                        <div style={gridCampos}>
                            <select
                                name="pet"
                                value={agendamento.pet}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            >
                                <option value="">Selecione um Pet</option>
                                {pets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>
                                        {pet.nome}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="servico"
                                value={agendamento.servico}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            >
                                <option value="">Selecione um serviço</option>
                                {servicos.map((servico) => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="date"
                                name="data"
                                value={agendamento.data}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            />
                            <input
                                type="time"
                                name="horario"
                                value={agendamento.horario}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            />
                            <input
                                type="text"
                                name="preco"
                                placeholder="Preço"
                                value={agendamento.preco}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            />
                            <input
                                type="text"
                                name="observacao"
                                placeholder="Observação"
                                value={agendamento.observacao}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            />
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        style={submitBotao(isFormValid, loading)}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            "Agendar"
                        )}
                        {loading && " Enviando..."}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

const fichaContainer: React.CSSProperties = {
    maxWidth: "700px",
    margin: "60px auto",
    background: "#fff",
    padding: "40px",
    border: "2px solid #081D40",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
};

const tituloFicha: React.CSSProperties = {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "30px",
    color: "#081D40",
    borderBottom: "2px solid #38FF9F",
    paddingBottom: "10px"
};

const formEstilo: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
};

const gridCampos: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
};

const inputEstilo: React.CSSProperties = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem"
};

const fieldsetEstilo: React.CSSProperties = {
    border: "2px dashed #38FF9F",
    borderRadius: "8px",
    padding: "20px"
};

const legendEstilo: React.CSSProperties = {
    padding: "0 12px",
    fontWeight: "bold",
    color: "#081D40",
    fontSize: "1.1rem"
};

const submitBotao = (isValid: boolean, loading: boolean): React.CSSProperties => ({
    padding: "14px",
    fontSize: "1rem",
    backgroundColor: isValid && !loading ? "#38FF9F" : "#ccc",
    color: "#081D40",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: isValid && !loading ? "pointer" : "not-allowed",
    transition: "background 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export default Agendamentos;
