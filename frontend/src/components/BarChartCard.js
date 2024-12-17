import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../css/LineChartCard.css"

const data = [
    { name: '01/01', kWh: 796, pa: 140, amt: 2400 },
    { name: '02/01', kWh: 545,  amt: 2210 },
    { name: '03/01', kWh: 295,  amt: 2290 },
    { name: '04/01', kWh: 286,  amt: 2000 },
    { name: '05/01', kWh: 250,  amt: 2000 },
    { name: '06/01', kWh: 495,  amt: 2000 },
    { name: '07/01', kWh: 634,  amt: 2000 },
    { name: '08/01', kWh: 572,  amt: 2000 },
    { name: '09/01', kWh: 1251,  amt: 2000 },
    { name: '10/01', kWh: 1092,  amt: 2000 },
];

const BarChartCard = () => {
    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1 className="chart-title">Solar Production</h1>

            </div>
            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Bar components replacing Line components */}
                        <Bar dataKey="kWh" stackId="a" fill="#8884d8" barSize={20} />
                        <Bar dataKey="pa" stackId="a" fill="#8884d8" barSize={20} />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartCard;
