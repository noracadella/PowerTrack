import React from 'react';
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

export default LineChartCard;
