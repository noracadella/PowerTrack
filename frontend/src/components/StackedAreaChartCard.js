import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../css/LineChartCard.css";

const StackedAreaChartCard = ({ year, month }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [year, month]);

    return (
        <div className="chart-container">
            <h1 className="chart-title">Consumption and Solar Production</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Área para el consumo total (grid + gas) */}
                        <Area type="monotone" dataKey="consumption" stackId="1" stroke="#5e8c61" fill="#5e8c61" />
                        {/* Área para la producción solar */}
                        <Area type="monotone" dataKey="solar_production"  stroke="#efca08" fill="#efca08" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default StackedAreaChartCard;
