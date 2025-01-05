
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";

const BarChartCard = ({ year, month, activeChart }) => {
    const [data, setData] = useState([]);
    const [view, setView] = useState("monthly");


    const fetchData = async (viewMode) => {
        try {
            let url;
            if (viewMode === "Daily") {
                url = `http://localhost:8000/HourlyData/consumption/day/3/12/`;
            } else if (viewMode === "Monthly") {
                url = `http://localhost:8000/HourlyData/consumption/month/3/`;
            } else if (viewMode === "Annually") {
                url = `http://localhost:8000/HourlyData/consumption/yearly/`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();

            const formattedData = viewMode === "Daily"
                ? json.hourly_consumption.map(item => ({
                    name: `Hour ${item.hour}`,
                    Grid: item.grid_supply,
                    Solar: item.solar_supply,
                }))
                : viewMode === "Monthly"
                    ? json.daily_consumption.map(item => ({
                        name: `Day ${item.day}`,
                        Grid: item.total_grid_supply,
                        Solar: item.total_solar,
                    }))
                    : json.monthly_consumption.map(item => ({
                        name: `Month ${item.month}`,
                        Grid: item.total_grid_supply,
                        Solar: item.total_solar,
                    }));

            setData(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(activeChart); // Llama a fetchData cuando activeChart cambie
    }, [activeChart]);

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
                            <Bar dataKey="Solar" stackId="a" fill="#50b83c" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

        </div>
    );
};

export default BarChartCard;
