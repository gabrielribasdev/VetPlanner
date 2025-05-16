import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Tabs, Tab } from "../components/ui/tab";
import {
  BotaoSubmit,
  FichaContainer,
  GridCampos,
  StyledFieldset,
  StyledForm,
  StyledInput,
  StyledLegend,
  StyledSelect,
  TituloFicha,
} from "../styles/cadastros-style";
import { Toast } from "../styles/toast-style";


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

  // Estados de loading para cada form
  const [loadingTutor, setLoadingTutor] = useState(false);
  const [loadingPet, setLoadingPet] = useState(false);

  // Estado para controlar o toast (mensagem + tipo)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchTutores = async () => {
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
        setTutores(data);
      } catch (err) {
        console.error("Erro ao buscar tutores", err);
      }
    };

    fetchTutores();
  }, []);

  const handlePetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleTutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTutorData({ ...tutorData, [e.target.name]: e.target.value });
  };

  const isPetFormValid = Object.values(petData).every((value) => value.trim() !== "");
  const isTutorFormValid = Object.values(tutorData).every((value) => value.trim() !== "");

  // Função para mostrar o toast e sumir após 3 segundos
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmitTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTutorFormValid) return;

    setLoadingTutor(true);

    const tutorPayload = {
      nome: tutorData.nomeTutor,
      email: tutorData.email,
      telefone: tutorData.telefone,
      cpf: tutorData.cpf,
      endereco: tutorData.endereco,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/cadastro/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorPayload),
      });

      const result = await response.json();

      if (response.ok) {
        showToast("Tutor cadastrado com sucesso!", "success");
        setTutorData({ nomeTutor: "", telefone: "", email: "", endereco: "", cpf: "" });
      } else {
        showToast(`Erro ao cadastrar o tutor: ${result.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Erro ao realizar cadastro. Tente novamente mais tarde.", "error");
    } finally {
      setLoadingTutor(false);
    }
  };

  const handleSubmitPet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPetFormValid) return;

    setLoadingPet(true);

    const petPayload = {
      nome: petData.nomePet,
      raca: petData.raca,
      idade: petData.idade,
      sexo: petData.sexo,
      peso: petData.peso,
      tutorId: petData.tutor,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/cadastro/pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(petPayload),
      });

      const result = await response.json();

      if (response.ok) {
        showToast("Pet cadastrado com sucesso!", "success");
        setPetData({ nomePet: "", raca: "", idade: "", sexo: "", peso: "", tutor: "" });
      } else {
        showToast(`Erro ao cadastrar o pet: ${result.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Erro ao realizar cadastro. Tente novamente mais tarde.", "error");
    } finally {
      setLoadingPet(false);
    }
  };

  return (
    <Layout>
      <FichaContainer>
        <TituloFicha>Ficha Médica de Atendimento - Pet</TituloFicha>
        <Tabs selectedTab={activeTab} onChange={setActiveTab}>
          <Tab label="Cadastro do Tutor">
            <StyledForm onSubmit={handleSubmitTutor}>
              <StyledFieldset>
                <StyledLegend>Informações do Tutor</StyledLegend>
                <GridCampos>
                  <StyledInput
                    type="text"
                    name="nomeTutor"
                    placeholder="Nome do Tutor"
                    value={tutorData.nomeTutor}
                    onChange={handleTutorChange}
                    required
                  />
                  <StyledInput
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    value={tutorData.telefone}
                    onChange={handleTutorChange}
                    required
                  />
                  <StyledInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={tutorData.email}
                    onChange={handleTutorChange}
                    required
                  />
                  <StyledInput
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={tutorData.cpf}
                    onChange={handleTutorChange}
                    required
                  />
                  <StyledInput
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    value={tutorData.endereco}
                    onChange={handleTutorChange}
                    required
                  />
                </GridCampos>
              </StyledFieldset>
              <BotaoSubmit type="submit" disabled={!isTutorFormValid || loadingTutor} isValid={isTutorFormValid} loading={loadingTutor}>
                {loadingTutor ? <div className="spinner" /> : "Cadastrar Tutor"}
              </BotaoSubmit>
            </StyledForm>
          </Tab>

          <Tab label="Cadastro do Pet">
            <StyledForm onSubmit={handleSubmitPet}>
              <StyledFieldset>
                <StyledLegend>Informações do Pet</StyledLegend>
                <GridCampos>
                  <StyledInput
                    type="text"
                    name="nomePet"
                    placeholder="Nome do Pet"
                    value={petData.nomePet}
                    onChange={handlePetChange}
                    required
                  />
                  <StyledInput
                    type="text"
                    name="raca"
                    placeholder="Raça"
                    value={petData.raca}
                    onChange={handlePetChange}
                    required
                  />
                  <StyledInput
                    type="number"
                    name="idade"
                    placeholder="Idade"
                    value={petData.idade}
                    onChange={handlePetChange}
                    required
                  />
                  <StyledSelect name="sexo" value={petData.sexo} onChange={handlePetChange} required>
                    <option value="">Sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </StyledSelect>
                  <StyledInput
                    type="number"
                    name="peso"
                    placeholder="Peso (kg)"
                    value={petData.peso}
                    onChange={handlePetChange}
                    required
                  />
                  <StyledSelect name="tutor" value={petData.tutor} onChange={handlePetChange} required>
                    <option value="">Selecione o Tutor</option>
                    {tutores.map((tutor) => (
                      <option key={tutor.id} value={tutor.id}>
                        {tutor.nome}
                      </option>
                    ))}
                  </StyledSelect>
                </GridCampos>
              </StyledFieldset>

              <BotaoSubmit type="submit" disabled={!isPetFormValid || loadingPet} isValid={isPetFormValid} loading={loadingPet}>
                {loadingPet ? <div className="spinner" /> : "Cadastrar Pet"}
              </BotaoSubmit>
            </StyledForm>
          </Tab>
        </Tabs>

        {toast && <Toast type={toast.type}>{toast.message}</Toast>}
      </FichaContainer>
    </Layout>
  );
};

export default Cadastro;
