import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";

const BarChartPrice = ({ year, month, activeChart }) => {
    const [data, setData] = useState([]);

    // Función para obtener datos según la vista activa
    const fetchData = async (viewMode) => {
        try {
            let url;
            if (viewMode === "Daily") {
                url = `http://localhost:8000/HourlyData/consumption/price/day/3/12/`; // Cambia a tu endpoint real
            } else if (viewMode === "Monthly") {
                url = `http://localhost:8000/HourlyData/consumption/price/month/3/`; // Cambia a tu endpoint real
            } else if (viewMode === "Annually") {
                url = `http://localhost:8000/HourlyData/consumption/price/yearly/`; // Cambia a tu endpoint real
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();

            const formattedData = viewMode === "Daily"
                ? json.hourly_costs.map(item => ({
                    name: `Hour ${item.hour}`,
                    GridCost: item.total_grid_cost,
                }))
                : viewMode === "Monthly"
                    ? json.daily_costs.map(item => ({
                        name: `Day ${item.day}`,
                        GridCost: item.total_grid_cost,
                    }))
                    : json.monthly_costs.map(item => ({
                        name: `Month ${item.month}`,
                        GridCost: item.total_grid_cost,
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
                <h1 className="chart-title">Consumption Cost</h1>
            </div>

            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="GridCost" stackId="a" fill="#1e5631" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartPrice;
