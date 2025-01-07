import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importar BrowserRouter y Routes
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
import PredictionScreen from "./components/PredictionScreen";
import Simulation from "./components/Simulation";


const App = () => {
    const [activeChart, setActiveChart] = useState("Monthly");

    const handleButtonClick = (buttonName) => {
        setActiveChart(buttonName);
    };

    return (
        <Router> {}
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="white-box">

                        <Routes> {}
                            <Route path="/" element={
                                <div>
                                <div className="chart-header">
                                    <h1 className="titol">Dashboard</h1>
                                    <ChartButtons onButtonClick={handleButtonClick} defaultActive="Monthly" />
                                </div>
                                <div className="dashboard-grid">
                                    <BarChartCard activeChart={activeChart}/>
                                    <PieChartCard />
                                    <LineChartCard activeChart={activeChart}/>
                                    <InstrumentCostCard />
                                    <BarChartPrice activeChart={activeChart}/>
                                    <LineChartComp activeChart={activeChart}/>
                                    <EmissionList />
                                </div>
                                </div>
                            } />
                            <Route path="/prediction" element={<PredictionScreen />} />
                            <Route path="/simulation"  element={<Simulation /> }/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
