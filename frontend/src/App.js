
import React, {useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LineChartCard from "./components/LineChartCard";
import PieChartCard from "./components/PieChartCard";
import BarChartCard from "./components/BarChartCard";
import ChartButtons from "./components/ChartButton";
import LineChartComp from "./components/LineChartComp";
import BarChartPrice from "./components/BarChartPrice";
import StatCard from "./components/StatCard";
import InstrumentCostCard from "./components/InstrumentCostCard";


const App = () => {
    const [activeChart, setActiveChart] = useState("Monthly");

    const handleButtonClick = (buttonName) => {
        setActiveChart(buttonName);
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <div className="white-box">
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
                    </div>

                </div>
            </div>
        </div>
    );
};


export default App;
