import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BarChartPrice = ({ year, month }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Hacer la llamada a la API para obtener los datos de costos mensuales
                const response = await fetch(`http://localhost:8000/HourlyData/consumption/price/month/3/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log("API Response:", json);

                // Formatear los datos para el gráfico
                const formattedData = json.daily_costs.map(item => ({
                    day: `${item.day}/01`,  // Para mostrarlo como un día (en formato dd/mm)
                    grid_cost: item.total_grid_cost,
                    gas_cost: item.total_gas_cost,
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
            <h1 className="chart-title">Consumption Cost</h1>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Barra para el costo de consumo de la red */}
                        <Bar dataKey="grid_cost" stackId="a" fill="#74a57f" />
                        {/* Barra para el costo de consumo de gas */}
                        <Bar dataKey="gas_cost" stackId="a" fill="#9ece9a" />
                    </BarChart>
                </ResponsiveContainer>
        </div>
    );
};

export default BarChartPrice;
