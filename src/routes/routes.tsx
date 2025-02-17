import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import Dashboard from "../pages/dashboard";
import Agendamentos from "../pages/agendamentos";
import Configuracoes from "../pages/configuracoes";
import Consultas from "../pages/consultas";
import Historico from "../pages/historico";
import Pacientes from "../pages/pacientes";
import Relatorios from "../pages/relatorios";
import Suporte from "../pages/suporte";
import Vacinas from "../pages/vacinas";
import Clientes from "../pages/clientes";
import Login from "../pages/login";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agendamentos" element={<Agendamentos />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/consultas" element={<Consultas />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/suporte" element={<Suporte />} />
                <Route path="/vacinas" element={<Vacinas />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
