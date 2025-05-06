import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import Dashboard from "../pages/dashboard";
import Agendamentos from "../pages/agendamentos";
import Configuracoes from "../pages/configuracoes";
import Consultas from "../pages/consultas";
import Historico from "../pages/historico";
import Relatorios from "../pages/relatorios";
import Suporte from "../pages/suporte";
import Vacinas from "../pages/vacinas";
import Clientes from "../pages/clientes";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import PrivateRoute from "./privateRoute";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dashboard />} />}
                />
                <Route
                    path="/agendamentos"
                    element={<PrivateRoute element={<Agendamentos />} />}
                />
                <Route
                    path="/configuracoes"
                    element={<PrivateRoute element={<Configuracoes />} />}
                />
                <Route
                    path="/consultas"
                    element={<PrivateRoute element={<Consultas />} />}
                />
                <Route
                    path="/historico"
                    element={<PrivateRoute element={<Historico />} />}
                />
                <Route
                    path="/pacientes"
                    element={<PrivateRoute element={<Cadastro />} />}
                />
                <Route
                    path="/relatorios"
                    element={<PrivateRoute element={<Relatorios />} />}
                />
                <Route
                    path="/suporte"
                    element={<PrivateRoute element={<Suporte />} />}
                />
                <Route
                    path="/vacinas"
                    element={<PrivateRoute element={<Vacinas />} />}
                />
                <Route
                    path="/clientes"
                    element={<PrivateRoute element={<Clientes />} />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
