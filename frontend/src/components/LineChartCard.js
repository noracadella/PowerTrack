import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css";


const LineChartCard = ({activeChart}) => {
    const [data, setData] = useState([]); // Estado para almacenar los datos de la API

    // Llamada a la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                let url;
                if (activeChart === "Daily") {
                    url = `http://localhost:8000/HourlyData/solarProduction/day/3/12/`; // URL para datos por hora
                } else if (activeChart === "Monthly") {
                    url = `http://localhost:8000/HourlyData/solarProduction/month/3/`; // URL para datos mensuales
                } else if (activeChart === "Annually") {
                    url = `http://localhost:8000/HourlyData/solarProduction/yearly/`; // URL para datos anuales
                }
                const response = await fetch(url);
                const result = await response.json();

                const formattedData =
                    activeChart === "Daily"
                        ? result.hourly_consumption.map(hourData => ({
                            name: `Hour ${hourData.hour}`,
                            SolarProduction: hourData.total_solar_production,
                        }))
                        : activeChart === "Monthly"
                            ? result.daily_totals.map(dayData => ({
                                name: `Day ${dayData.day}`,
                                SolarProduction: dayData.total_solar_production,
                            }))
                            : result.yearly_totals.map(monthData => ({
                                name: `Month ${monthData.month}`,
                                SolarProduction: monthData.total_solar_production,
                            }));

                setData(formattedData);
                console.log("Formatted Data:", formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [activeChart]);

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
                        <Line type="monotone" dataKey="SolarProduction" name="SolarProduction (kWh)" stroke="#efca08" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartCard;

