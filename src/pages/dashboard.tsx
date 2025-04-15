import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import Layout from "../components/layout/layout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const servicosData = {
        labels: ["Consulta", "Banho", "Tosa", "Vacina"],
        datasets: [
            {
                label: "Serviços Mais Solicitados",
                data: [50, 80, 45, 60],
                backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"],
            },
        ],
    };

    const vacinasData = {
        labels: ["Realizadas", "Pendentes"],
        datasets: [
            {
                label: "Vacinações",
                data: [70, 30],
                backgroundColor: ["#4caf50", "#f44336"],
            },
        ],
    };

    return (
        <Layout>
            <div style={fichaContainer}>
                <h1 style={tituloFicha}>Dashboard de Relatórios</h1>

                <div style={linhaGraficos}>
                    <div style={graficoBox}>
                        <h3 style={tituloGrafico}>Serviços Mais Solicitados</h3>
                        <fieldset style={fieldsetEstilo}>
                            <Bar data={servicosData} />
                        </fieldset>
                    </div>

                    <div style={graficoBox}>
                        <h3 style={tituloGrafico}>Vacinações Realizadas x Pendentes</h3>
                        <fieldset style={fieldsetEstilo}>
                            <Pie data={vacinasData} />
                        </fieldset>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const fichaContainer: React.CSSProperties = {
    maxWidth: "100%",
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
    marginBottom: "40px",
    color: "#081D40",
    borderBottom: "2px solid #38FF9F",
    paddingBottom: "10px"
};

const linhaGraficos: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap"
};

const graficoBox: React.CSSProperties = {
    flex: "1",
    minWidth: "400px"
};

const fieldsetEstilo: React.CSSProperties = {
    border: "2px dashed #38FF9F",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fafafa"
};

const tituloGrafico: React.CSSProperties = {
    textAlign: "center",
    color: "#081D40",
    marginBottom: "10px",
    fontSize: "1.2rem"
};

export default Dashboard;
