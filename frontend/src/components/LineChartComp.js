import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";

const LineChartCard = ({ activeChart }) => {
    const [data, setData] = useState([]);
    const [view, setView] = useState("Monthly");

    const fetchData = async (viewMode) => {
        try {
            let url;
            if (viewMode === "Daily") {
                url = `http://localhost:8000/EmissionFactor/consumption/grid/day/3/12/`; // Cambiar según tu endpoint
            } else if (viewMode === "Monthly") {
                url = `http://localhost:8000/EmissionFactor/consumption/grid/month/3/`; // Cambiar según tu endpoint
            } else if (viewMode === "Annually") {
                url = `http://localhost:8000/EmissionFactor/consumption/grid/yearly/`; // Cambiar según tu endpoint
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            console.log("API Response:", json);

            // Formatear datos según el modo de vista
            const formattedData = viewMode === "Daily" && json.hourly_emissions && Array.isArray(json.hourly_emissions)
                ? json.hourly_emissions.map(item => ({
                    name: `Hour ${item.hour}`,
                    CarbonEmission: item.total_carbon_emission,
                }))
                : viewMode === "Monthly"
                    ? json.daily_emissions.map(item => ({
                        name: `Day ${item.day}`,
                        CarbonEmission: item.total_carbon_emission,
                    }))
                    : json.monthly_emissions.map(item => ({
                        name: `Month ${item.month}`,
                        CarbonEmission: item.total_carbon_emission,
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
                <h1 className="chart-title">Emissions</h1>
            </div>

            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="CarbonEmission" stroke="#5e8c61" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartCard;
