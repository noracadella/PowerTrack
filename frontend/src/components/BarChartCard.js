
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";

const BarChartCard = ({ year, month }) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/HourlyData/consumption/month/3/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                const formattedData = json.daily_consumption.map(item => ({
                    name: `Dia ${item.day}`, // Formato de nombre del día
                    Grid: item.total_grid_supply,
                    Gas: item.total_natural_gas,
                }));
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
                <h1 className="chart-title">Consumption</h1>
            </div>

                <div className="chart">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Grid" stackId="a" fill="#1e5631" barSize={20} />
                            <Bar dataKey="Gas" stackId="a" fill="#50b83c" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

        </div>
    );
};

export default BarChartCard;
