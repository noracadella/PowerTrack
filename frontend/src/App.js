
import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import LineChartCard from "./components/LineChartCard";
import PieChartCard from "./components/PieChartCard";
import BarChartCard from "./components/BarChartCard";
import ChartButtons from "./components/ChartButton";
import LineChartComp from "./components/LineChartComp";
import BarChartPrice from "./components/BarChartPrice";
import InstrumentCostCard from "./components/InstrumentCostCard";
import EmissionList from "./components/EmissionList";
import Simulation from "./components/Simulation";  // Importa el componente Simulation

const App = () => {
    const [activeChart, setActiveChart] = useState("Monthly");
    const [activeComponent, setActiveComponent] = useState("dashboard");  // Nuevo estado para manejar el componente activo

    const handleButtonClick = (buttonName) => {
        setActiveChart(buttonName);
    };

    const handleSidebarClick = (componentName) => {
        setActiveComponent(componentName);  // Cambiar el componente activo según lo que se haga clic en el sidebar
    };

    // Función para renderizar el componente adecuado según la selección en la barra lateral
    const renderComponent = () => {
        switch (activeComponent) {
            case "simulation":
                return <Simulation />;
            case "dashboard":
                return (
                    <div className="dashboard-grid">
                        <BarChartCard activeChart={activeChart} />
                        <PieChartCard />
                        <LineChartCard activeChart={activeChart} />
                        <InstrumentCostCard />
                        <BarChartPrice activeChart={activeChart} />
                        <LineChartComp activeChart={activeChart} />
                        <EmissionList />
                    </div>
                );
            // Puedes agregar otros casos si tienes más secciones
            default:
                return (
                    <div className="dashboard-grid">
                        <BarChartCard activeChart={activeChart} />
                        <PieChartCard />
                        <LineChartCard activeChart={activeChart} />
                        <InstrumentCostCard />
                        <BarChartPrice activeChart={activeChart} />
                        <LineChartComp activeChart={activeChart} />
                        <EmissionList />
                    </div>
                );
        }
    };

    return (
        <div className="app-container">
            <Sidebar onSidebarClick={handleSidebarClick} />  {/* Pasa la función handleSidebarClick */}
            <div className="main-content">
                <div className="white-box">
                    <div className="chart-header">
                        <h1 className="titol">Dashboard</h1>
                        <ChartButtons onButtonClick={handleButtonClick} defaultActive="Monthly" />
                    </div>

                    {/* Renderiza el componente seleccionado */}
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default App;
