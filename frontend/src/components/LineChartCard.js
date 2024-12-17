/*import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Chart} from "chart.js";
import "../css/LineChartCard.css"

const data = [
    { name: '01/01', Grid:6620, Gas: 1324.1, amt: 2400 },
    { name: '02/01', Grid: 6694, Gas: 1339, amt: 2210 },
    { name: '03/01', Grid: 9984, Gas: 1997, amt: 2290 },
    { name: '04/01', Grid: 23721, Gas: 4744, amt: 2000 },
    { name: '05/01', Grid: 25637, Gas: 5127, amt: 2000 },
    { name: '06/01', Grid: 27074, Gas: 5414, amt: 2000 },
    { name: '07/01', Grid: 24146, Gas: 4829, amt: 2000 },
    { name: '08/01', Grid: 15634, Gas: 3127, amt: 2000 },
    { name: '09/01', Grid: 15183, Gas: 3037, amt: 2000 },
    { name: '10/01', Grid: 20293, Gas: 4059, amt: 2000 },
];

const LineChartCard = () => {
    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Energy Consumption</h1>
                <div className="button-container">
                    <button className="chart-button">Hourly</button>
                    <button className="chart-button">Weekly</button>
                    <button className="chart-button">Monthly</button>
                </div>
            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="Grid" stroke="#8884d8"/>
                        <Line type="monotone" dataKey="Gas" stroke="#82ca9d"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartCard;*/
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";

const LineChartCard = () => {
    const [data, setData] = useState([]); // Estado para almacenar los datos de la API
    const [month, setMonth] = useState(1); // Estado para seleccionar el mes

    // Llamada a la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/HourlyData/solarProduction/month/1/`);
                const result = await response.json();
                const formattedData = result.daily_totals.map(dayData => ({
                    name: `Day ${dayData.day}`,
                    SolarProduction: dayData.total_solar_production

                }));
                setData(formattedData);
                console.log("Formatted Data:", formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [month]); // Llama a la API cuando cambie el mes

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Solar Production</h1>

            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="SolarProduction" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartCard;

