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
                // Llamada a la API para obtener los datos de consumo y producción solar para el mes
                const response = await fetch(`http://localhost:8000/HourlyData/consVsProd/month/3/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log("API Response:", json);

                // Formatear los datos para pasarlos al gráfico
                const formattedData = json.daily_data.map(item => ({
                    day: item.day,
                    consumption: item.consumption,  // Suma de consumo (grid + gas)
                    solar_production: item.solar_production,  // Producción solar
                }));

                setData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [month]); // Llama a la API cuando cambie el mes

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Consumption and Solar Production</h1>

            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="consumption" stroke="#5e8c61" />
                        <Line type="monotone" dataKey="solar_production" stroke="#efca08" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartCard;