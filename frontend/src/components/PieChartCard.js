import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css"

// Datos de ejemplo para el gráfico de pastel
const data = [
    { name: 'Grid', value: 833 },
    { name: 'Gas', value: 167 },

];

const COLORS = ['#8884d8', '#82ca9d', '#ff7f50', '#ffbf00']; // Colores para cada segmento

const PieChartCard = () => {
    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Type of Energy</h1>

            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%" // Centrado en el eje X
                            cy="50%" // Centrado en el eje Y
                            outerRadius={80} // Radio exterior del gráfico
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
