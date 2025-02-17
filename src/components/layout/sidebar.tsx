import React, { useEffect, useState } from "react";
import { SidebarContainer } from "../../styles/layout.style";
import { FaHome, FaCalendarAlt, FaUsers, FaCog, FaChartBar, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [isGestaoOpen, setIsGestaoOpen] = useState(false);
    const [isPacientesOpen, setIsPacientesOpen] = useState(false);
    const [isRelatoriosOpen, setIsRelatoriosOpen] = useState(false);

    const toggleGestao = () => setIsGestaoOpen((prev) => !prev);
    const togglePacientes = () => setIsPacientesOpen((prev) => !prev);
    const toggleRelatorios = () => setIsRelatoriosOpen((prev) => !prev);

    useEffect(() => {
        if (!isOpen) {
            setIsGestaoOpen(false);
            setIsPacientesOpen(false);
            setIsRelatoriosOpen(false);
        }
    }, [isOpen]);

    return (
        <SidebarContainer isOpen={isOpen}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <FaHome />
                            <span>Início</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <FaHome />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" onClick={toggleGestao}>
                            <FaCalendarAlt />
                            <span>Gestão de Agenda</span>
                        </Link>
                        {isGestaoOpen && (
                            <ul>
                                <li>
                                    <Link to="/agendamentos">Agendamentos</Link>
                                </li>
                                <li>
                                    <Link to="/consultas">Consultas</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="#" onClick={togglePacientes}>
                            <FaUsers />
                            <span>Gestão de Pacientes</span>
                        </Link>
                        {isPacientesOpen && (
                            <ul>
                                <li>
                                    <Link to="/pacientes">Pacientes</Link>
                                </li>
                                <li>
                                    <Link to="/vacinas">Vacinas</Link>
                                </li>
                                <li>
                                    <Link to="/historico">Histórico</Link>
                                </li>
                                <li>
                                    <Link to="/clientes">Clientes</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="#" onClick={toggleRelatorios}>
                            <FaChartBar />
                            <span>Relatórios e Análises</span>
                        </Link>
                        {isRelatoriosOpen && (
                            <ul>
                                <li>
                                    <Link to="/relatorios">Relatórios</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/configuracoes">
                            <FaCog />
                            <span>Configurações</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/suporte">
                            <FaQuestionCircle />
                            <span>Suporte</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </SidebarContainer>
    );
};

export default Sidebar;
