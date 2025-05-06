import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Tabs, Tab } from "../components/ui/tab";

const Cadastro: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const [petData, setPetData] = useState({
        nomePet: "",
        raca: "",
        idade: "",
        sexo: "",
        peso: "",
        tutor: "", 
    });

    const [tutorData, setTutorData] = useState({
        nomeTutor: "",
        telefone: "",
        email: "",
        endereco: "",
        cpf: "",
    });

    const [tutores, setTutores] = useState<any[]>([]);

    useEffect(() => {
        const fetchTutores = async () => {
            try {
                const token = localStorage.getItem("authToken");

                    const response = await fetch(
                        "http://127.0.0.1:8000/api/tutor/listar",
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                const data = await response.json();
                setTutores(data); 
            } catch (err) {
                console.error("Erro ao buscar tutores", err);
            }
        };

        fetchTutores(); 
    }, []);

    const handlePetChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setPetData({
            ...petData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTutorData({
            ...tutorData,
            [e.target.name]: e.target.value,
        });
    };

    const isPetFormValid = Object.values(petData).every(
        (value) => value.trim() !== ""
    );
    const isTutorFormValid = Object.values(tutorData).every(
        (value) => value.trim() !== ""
    );
    const isFormValid = isPetFormValid && isTutorFormValid;

    const handleSubmitTutor = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isTutorFormValid) {
            const tutorPayload = {
                nome: tutorData.nomeTutor,
                email: tutorData.email,
                telefone: tutorData.telefone,
                cpf: tutorData.cpf,
                endereco: tutorData.endereco,
            };

            const token = localStorage.getItem("authToken");

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/cadastro/tutor",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(tutorPayload),
                    }
                );

                const result = await response.json();
                if (response.ok) {
                    alert("Tutor cadastrado com sucesso!");
                } else {
                    alert("Erro ao cadastrar o tutor: " + result.message);
                }
            } catch (err) {
                console.error(err);
                alert("Erro ao realizar cadastro. Tente novamente mais tarde.");
            }
        }
    };

    const handleSubmitPet = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isPetFormValid) {
            const petPayload = {
                nome: petData.nomePet,
                raca: petData.raca,
                idade: petData.idade,
                sexo: petData.sexo,
                peso: petData.peso,
                tutorId: petData.tutor,
            };

            const token = localStorage.getItem("authToken");

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/cadastro/pet",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(petPayload),
                    }
                );

                const result = await response.json();
                if (response.ok) {
                    alert("Pet cadastrado com sucesso!");
                } else {
                    alert("Erro ao cadastrar o pet: " + result.message);
                }
            } catch (err) {
                console.error(err);
                alert("Erro ao realizar cadastro. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <Layout>
            <div style={fichaContainer}>
                <h1 style={tituloFicha}>Ficha Médica de Atendimento - Pet</h1>

                <Tabs selectedTab={activeTab} onChange={setActiveTab}>
                    <Tab label="Cadastro do Tutor">
                        <form onSubmit={handleSubmitTutor} style={formEstilo}>
                            <fieldset style={fieldsetEstilo}>
                                <legend style={legendEstilo}>
                                    Informações do Tutor
                                </legend>
                                <div style={gridCampos}>
                                    <input
                                        type="text"
                                        name="nomeTutor"
                                        placeholder="Nome do Tutor"
                                        value={tutorData.nomeTutor}
                                        onChange={handleTutorChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <input
                                        type="text"
                                        name="telefone"
                                        placeholder="Telefone"
                                        value={tutorData.telefone}
                                        onChange={handleTutorChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={tutorData.email}
                                        onChange={handleTutorChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <input
                                        type="text"
                                        name="cpf"
                                        placeholder="CPF"
                                        value={tutorData.cpf}
                                        onChange={handleTutorChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <input
                                        type="text"
                                        name="endereco"
                                        placeholder="Endereço"
                                        value={tutorData.endereco}
                                        onChange={handleTutorChange}
                                        required
                                        style={inputEstilo}
                                    />
                                </div>
                            </fieldset>
                            <input
                                type="submit"
                                value="Cadastrar Tutor"
                                disabled={!isTutorFormValid}
                                style={submitBotao(isTutorFormValid)}
                            />
                        </form>
                    </Tab>

                    <Tab label="Cadastro do Pet">
                        <form onSubmit={handleSubmitPet} style={formEstilo}>
                            <fieldset style={fieldsetEstilo}>
                                <legend style={legendEstilo}>
                                    Informações do Pet
                                </legend>
                                <div style={gridCampos}>
                                    <input
                                        type="text"
                                        name="nomePet"
                                        placeholder="Nome do Pet"
                                        value={petData.nomePet}
                                        onChange={handlePetChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <input
                                        type="text"
                                        name="raca"
                                        placeholder="Raça"
                                        value={petData.raca}
                                        onChange={handlePetChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <input
                                        type="number"
                                        name="idade"
                                        placeholder="Idade"
                                        value={petData.idade}
                                        onChange={handlePetChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <select
                                        name="sexo"
                                        value={petData.sexo}
                                        onChange={handlePetChange}
                                        required
                                        style={inputEstilo}
                                    >
                                        <option value="">Sexo</option>
                                        <option value="Macho">Macho</option>
                                        <option value="Fêmea">Fêmea</option>
                                    </select>
                                    <input
                                        type="number"
                                        name="peso"
                                        placeholder="Peso (kg)"
                                        value={petData.peso}
                                        onChange={handlePetChange}
                                        required
                                        style={inputEstilo}
                                    />
                                    <select
                                        name="tutor"
                                        value={petData.tutor}
                                        onChange={handlePetChange}
                                        required
                                        style={inputEstilo}
                                    >
                                        <option value="">Selecione o Tutor</option>
                                        {tutores.map((tutor) => (
                                            <option key={tutor.id} value={tutor.id}>
                                                {tutor.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </fieldset>
                            <input
                                type="submit"
                                value="Cadastrar Pet"
                                disabled={!isPetFormValid }
                                style={submitBotao(isPetFormValid)}
                            />
                        </form>
                    </Tab>
                </Tabs>
            </div>
        </Layout>
    );
};

const fichaContainer: React.CSSProperties = {
    maxWidth: "900px",
    margin: "60px auto",
    background: "#fff",
    padding: "40px",
    border: "2px solid #081D40",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
};

const tituloFicha: React.CSSProperties = {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "30px",
    color: "#081D40",
    borderBottom: "2px solid #38FF9F",
    paddingBottom: "10px",
};

const formEstilo: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
};

const gridCampos: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
};

const inputEstilo: React.CSSProperties = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
};

const fieldsetEstilo: React.CSSProperties = {
    border: "2px dashed #38FF9F",
    marginTop: "20px",
    borderRadius: "8px",
    padding: "20px",
};

const legendEstilo: React.CSSProperties = {
    padding: "0 12px",
    fontWeight: "bold",
    color: "#081D40",
    fontSize: "1.1rem",
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
    transition: "background 0.3s ease-in-out",
});

export default Cadastro;
