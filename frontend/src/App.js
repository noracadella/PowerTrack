//import logo from './logo.svg';


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


    /*return(
        <div>
            <div className="header">
                <Navbar  />
            </div>
            <div className="body">

                <Example/>
            </div>
        </div>

  );*/
}

export default App;
