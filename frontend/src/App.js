//import logo from './logo.svg';
/*

import './App.css';
import React from "react";
import LineChartCard from './components/LineChartCard';
import PieChartCard from './components/PieChartCard';
import BarChartCard from './components/BarChartCard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';




const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="main-layout">
                <Sidebar />
                <div className="dashboard">
                    <header className="dashboard-header">
                        <h1>Dashboard</h1>
                    </header>
                    <div className="dashboard-grid">
                        <LineChartCard />
                        <PieChartCard />
                        <BarChartCard />
                    </div>
                </div>
            </div>

        </div>
    );
*/

    /*return(
        <div>
            <div className="header">
                <Navbar  />
            </div>
            <div className="body">

                <Example/>
            </div>
        </div>

  );
}*/

import React, {useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LineChartCard from "./components/LineChartCard";
import PieChartCard from "./components/PieChartCard";
import BarChartCard from "./components/BarChartCard";
import ChartButtons from "./components/ChartButton";
import StatCard from "./components/StatCard";


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
                        <LineChartCard/>
                        <PieChartCard/>
                        <BarChartCard/>

                    </div>

                </div>
            </div>
        </div>
    );
};


export default App;
