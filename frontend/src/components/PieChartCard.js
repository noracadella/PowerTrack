
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";
//#f49e40
//'#50b83c'
const COLORS = ['#1e5631', '#f49e40']; // Colores para Grid y Gas

const PieChartCard = ({ year, month }) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/HourlyData/consumption/percentatge/month/3/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();

                const totalGrid = Math.min(100, parseFloat(json.total_grid_percentage.toFixed(2)));
                const totalSolar = Math.min(100, parseFloat(json.total_solar_percentage.toFixed(2)));
                const formattedData = [
                    { name: 'Grid', value: totalGrid },
                    { name: 'Solar', value: totalSolar }
                ];
                setData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [year, month]);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Energy Consumption Breakdown</h1>
            </div>
                <div className="chart">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

        </div>
    );
};

export default PieChartCard;

