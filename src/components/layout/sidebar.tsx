import React, { useEffect, useState } from "react";
import { SidebarContainer } from "../../styles/layout.style";
import { FaHome, FaCalendarAlt, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    openSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, openSidebar }) => {
    const [isGestaoOpen, setIsGestaoOpen] = useState(false);
    const [isPacientesOpen, setIsPacientesOpen] = useState(false);
    const [isRelatoriosOpen, setIsRelatoriosOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsGestaoOpen(false);
            setIsPacientesOpen(false);
            setIsRelatoriosOpen(false);
        }
    }, [isOpen]);

    const handleToggleGestao = () => {
        if (!isOpen) openSidebar();
        setIsGestaoOpen((prev) => !prev);
    };

    const handleTogglePacientes = () => {
        if (!isOpen) openSidebar();
        setIsPacientesOpen((prev) => !prev);
    };

    const handleToggleRelatorios = () => {
        if (!isOpen) openSidebar();
        setIsRelatoriosOpen((prev) => !prev);
    };

    return (
        <SidebarContainer isOpen={isOpen}>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <FaHome />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" onClick={handleToggleGestao}>
                            <FaCalendarAlt />
                            <span>Gestão de Agenda</span>
                        </Link>
                        {isGestaoOpen && (
                            <ul>
                                <li>
                                    <Link to="/agendamentos">Agendamentos</Link>
                                </li>
                                <li>
                                    <Link to="/historico">Histórico</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="#" onClick={handleTogglePacientes}>
                            <FaUsers />
                            <span>Gestão de Pacientes</span>
                        </Link>
                        {isPacientesOpen && (
                            <ul>
                                <li>
                                    <Link to="/clientes">Clientes</Link>
                                </li>
                                <li>
                                    <Link to="/pacientes">Pacientes</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="#" onClick={handleToggleRelatorios}>
                            <FaChartBar />
                            <span>Cadastros</span>
                        </Link>
                        {isRelatoriosOpen && (
                            <ul>
                                <li>
                                    <Link to="/cadastro">Cadastro</Link>
                                </li>
                                <li>
                                    <Link to="/vacinas">Vacinas</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </SidebarContainer>
    );
};

export default Sidebar;
