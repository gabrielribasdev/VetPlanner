import React, { useState } from "react";
import Layout from "../components/layout/layout";

const Agendamentos: React.FC = () => {
    const [agendamento, setAgendamento] = useState({
        pet: "",
        servico: "",
        data: "",
        horario: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAgendamento({
            ...agendamento,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Agendamento realizado:", agendamento);
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
                            <input
                                type="text"
                                name="pet"
                                placeholder="Nome do Pet"
                                value={agendamento.pet}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            />
                            <select
                                name="servico"
                                value={agendamento.servico}
                                onChange={handleChange}
                                required
                                style={inputEstilo}
                            >
                                <option value="">Selecione um serviço</option>
                                <option value="consulta">Consulta</option>
                                <option value="banho">Banho</option>
                                <option value="tosa">Tosa</option>
                                <option value="vacina">Vacina</option>
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
                        </div>
                    </fieldset>
                    <input
                        type="submit"
                        value="Agendar"
                        disabled={!isFormValid}
                        style={submitBotao(isFormValid)}
                    />
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

const submitBotao = (isValid: boolean): React.CSSProperties => ({
    padding: "14px",
    fontSize: "1rem",
    backgroundColor: isValid ? "#38FF9F" : "#ccc",
    color: "#081D40",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: isValid ? "pointer" : "not-allowed",
    transition: "background 0.3s ease-in-out"
});

export default Agendamentos;
