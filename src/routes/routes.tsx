import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/notFound";
import Dashboard from "../pages/dashboard";
import Agendamentos from "../pages/agendamentos";
import Historico from "../pages/historico";
import Vacinas from "../pages/vacinas";
import Clientes from "../pages/clientes";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import PrivateRoute from "./privateRoute";
import Pacientes from "../pages/pacientes";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
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
                    path="/historico"
                    element={<PrivateRoute element={<Historico />} />}
                />
                <Route
                    path="/pacientes"
                    element={<PrivateRoute element={<Pacientes />} />}
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
