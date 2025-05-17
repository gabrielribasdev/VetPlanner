import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import Layout from "../components/layout/layout";
import { FichaContainer, TituloFicha, LinhaGraficos, GraficoBox, FieldsetEstilo, TituloGrafico } from "../styles/dashboard-styles";

ChartJS.register( CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend );

type ServicoData = {
    servico: string;
    quantidade: number;
    cor: string;
};

type StatusData = {
    finalizados: number;
    emAberto: number;
};

type MesData = {
    mes: string;
    quantidade: number;
};

const Dashboard: React.FC = () => {
    const [servicos, setServicos] = useState<ServicoData[]>([]);
    const [status, setStatus] = useState<StatusData>({ finalizados: 0, emAberto: 0 });
    const [mes, setMes] = useState<MesData[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(
                    "http://127.0.0.1:8000/api/agendamentos/dashboard",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                setServicos(data.solicitados);
                setStatus(data.status);
                setMes(data.mes);
            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const totalQuantidade = servicos.reduce(
        (sum, item) => sum + item.quantidade,
        0
    );

    const servicosData = {
        labels: servicos.map((item) => item.servico),
        datasets: [
            {
                label: "Serviços Mais Solicitados (%)",
                data:
                    totalQuantidade > 0
                        ? servicos.map(
                              (item) =>
                                  (item.quantidade / totalQuantidade) * 100
                          )
                        : [],
                backgroundColor: servicos.map((item) => item.cor),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const idx = context.dataIndex;
                        const real = servicos[idx]?.quantidade || 0;
                        const percent = context.parsed.y.toFixed(2);
                        return `${real} (${percent}%)`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                    callback: function (tickValue: string | number) {
                        return tickValue + "%";
                    },
                },
                title: {
                    display: true,
                    text: "Porcentagem",
                },
            },
        },
    };

    const pizzaData = {
        labels: ["Finalizados", "A finalizar"],
        datasets: [
            {
                label: "Status dos Serviços",
                data: [status.finalizados, status.emAberto],
                backgroundColor: ["#4caf50", "#ff9800"],
                hoverBackgroundColor: ["#388e3c", "#f57c00"],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    const currentYear = new Date().getFullYear();
    const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ];

    const mapMeses = {
        janeiro: "Jan",
        fevereiro: "Fev",
        março: "Mar",
        abril: "Abr",
        maio: "Mai",
        junho: "Jun",
        julho: "Jul",
        agosto: "Ago",
        setembro: "Set",
        outubro: "Out",
        novembro: "Nov",
        dezembro: "Dez",
    } as const; 

    type MesesKeys = keyof typeof mapMeses;

    const consultasPorMes = meses.map((mesAbrev) => {
        const mesCompleto = (Object.keys(mapMeses) as MesesKeys[]).find(
            (key) => mapMeses[key] === mesAbrev
        );

        const objMes = mesCompleto
            ? mes.find((m) => m.mes.toLowerCase() === mesCompleto)
            : undefined;
        return objMes ? objMes.quantidade : 0;
    });

    const totalConsultas = consultasPorMes.reduce((sum, val) => sum + val, 0);

    const consultasPorMesPercent =
        totalConsultas > 0
            ? consultasPorMes.map((val) => (val / totalConsultas) * 100)
            : [];

    const consultasPorMesData = {
        labels: meses,
        datasets: [
            {
                label: `Consultas Marcadas em ${currentYear} (%)`,
                data: consultasPorMesPercent,
                backgroundColor: "#2196f3",
                hoverBackgroundColor: "#1769aa",
            },
        ],
    };

    const consultasPorMesOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `Consultas Marcadas por Mês - ${currentYear}`,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const idx = context.dataIndex;
                        const valorReal = consultasPorMes[idx] || 0;
                        const percent = context.parsed.y.toFixed(2);
                        return `${valorReal} consultas (${percent}%)`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                    callback: function (tickValue: string | number) {
                        return tickValue + "%";
                    },
                },
                title: {
                    display: true,
                    text: "Porcentagem",
                },
            },
        },
    };

    return (
        <Layout>
            <FichaContainer>
                <TituloFicha>Dashboard de Relatórios</TituloFicha>

                <LinhaGraficos
                    style={{
                        display: "flex",
                        gap: "40px",
                        justifyContent: "center",
                    }}
                >
                    <GraficoBox style={{ height: 300, width: 400 }}>
                        <TituloGrafico>Status dos Serviços</TituloGrafico>
                        <FieldsetEstilo>
                            <div style={{ height: "250px" }}>
                                <Pie data={pizzaData} options={pieOptions} />
                            </div>
                        </FieldsetEstilo>
                    </GraficoBox>

                    <GraficoBox style={{ height: 300, width: 600 }}>
                        <TituloGrafico>
                            Consultas Marcadas por Mês
                        </TituloGrafico>
                        <FieldsetEstilo>
                            <div style={{ height: "250px" }}>
                                <Bar
                                    data={consultasPorMesData}
                                    options={consultasPorMesOptions}
                                />
                            </div>
                        </FieldsetEstilo>
                    </GraficoBox>
                </LinhaGraficos>

                <LinhaGraficos style={{ marginTop: 50 }}>
                    <GraficoBox style={{ height: 300 }}>
                        <TituloGrafico>Serviços Mais Solicitados</TituloGrafico>
                        <FieldsetEstilo>
                            <div style={{ height: "250px" }}>
                                <Bar data={servicosData} options={options} />
                            </div>
                        </FieldsetEstilo>
                    </GraficoBox>
                </LinhaGraficos>
            </FichaContainer>
        </Layout>
    );
};

export default Dashboard;
