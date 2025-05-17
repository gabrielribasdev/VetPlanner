import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { BotaoSubmit, FichaContainer, FieldsetEstilo, FormEstilo, GridCampos, InputEstilo, LegendEstilo, SelectEstilo, TituloFicha } from "../styles/cadastros-style";

import { Toast } from "../styles/toast-style";

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

type Vacina = {
    id: number;
    nome: string;
    preco: string;
    marca: string;
    periodo: number;
};

const Agendamentos: React.FC = () => {
    const [agendamento, setAgendamento] = useState({
        pet: "",
        servico: "",
        vacina: "",
        periodo: "",
        data: "",
        horario: "",
        preco: "",
        observacao: "",
    });

    const [servicos, setServicos] = useState<Servico[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [vacinas, setVacinas] = useState<Vacina[]>([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");

                const [resPets, resServicos, resVacinas] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/cadastro/pet/listar", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch("http://127.0.0.1:8000/api/servicos/listar", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch("http://127.0.0.1:8000/api/vacinas/listar", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                if (!resPets.ok || !resServicos.ok || !resVacinas.ok)
                    throw new Error("Erro ao buscar dados");

                const [dataPets, dataServicos, dataVacinas] = await Promise.all(
                    [resPets.json(), resServicos.json(), resVacinas.json()]
                );

                setPets(dataPets);
                setServicos(dataServicos);
                setVacinas(dataVacinas);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }
        };

        fetchData();
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
                vacina: "",
                periodo: "",
            }));
        } else if (name === "vacina") {
            const vacinaSelecionada = vacinas.find(
                (v) => v.id === parseInt(value)
            );
            setAgendamento((prev) => ({
                ...prev,
                vacina: value,
                preco: vacinaSelecionada ? vacinaSelecionada.preco : "",
                periodo: vacinaSelecionada
                    ? vacinaSelecionada.periodo.toString()
                    : "",
            }));
        } else {
            setAgendamento((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const agendamentoData = {
            pet: agendamento.pet,
            servico_id: parseInt(agendamento.servico),
            vacina_id: agendamento.vacina
                ? parseInt(agendamento.vacina)
                : undefined,
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

            console.log(JSON.stringify(agendamentoData));
            if (response.ok) {
                setAgendamento({
                    pet: "",
                    servico: "",
                    vacina: "",
                    periodo: "",
                    data: "",
                    horario: "",
                    preco: "",
                    observacao: "",
                });
                setToast({
                    message: "Agendamento realizado com sucesso!",
                    type: "success",
                });
            } else {
                setToast({
                    message: "Erro ao salvar agendamento.",
                    type: "error",
                });
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

    const isFormValid = () => {
        if (
            !agendamento.pet.trim() ||
            !agendamento.servico.trim() ||
            !agendamento.data.trim() ||
            !agendamento.horario.trim() ||
            !agendamento.preco.trim() ||
            !agendamento.observacao.trim()
        ) {
            return false;
        }

        const servicoSelecionado = servicos.find(
            (s) => s.id === parseInt(agendamento.servico)
        );
        if (
            servicoSelecionado?.nome.toLowerCase() === "vacinação" &&
            !agendamento.vacina.trim()
        ) {
            return false;
        }

        return true;
    };

    const servicoSelecionado = servicos.find(
        (s) => s.id === parseInt(agendamento.servico)
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

                            {servicoSelecionado?.nome.toLowerCase() ===
                                "vacinação" && (
                                <>
                                    <SelectEstilo
                                        name="vacina"
                                        value={agendamento.vacina}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Selecione uma vacina
                                        </option>
                                        {vacinas.map((vacina) => (
                                            <option
                                                key={vacina.id}
                                                value={vacina.id}
                                            >
                                                {vacina.nome}
                                            </option>
                                        ))}
                                    </SelectEstilo>

                                    <InputEstilo
                                        type="text"
                                        name="periodo"
                                        value={agendamento.periodo}
                                        readOnly
                                        placeholder="Período da vacina (dias)"
                                    />
                                </>
                            )}

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
                        disabled={!isFormValid() || loading}
                        isValid={isFormValid()}
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
