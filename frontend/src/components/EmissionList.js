import React, { useEffect, useState } from 'react';
import '../css/InstrumentCostCard.css'; // Asegúrate de crear este archivo CSS

const EmissionList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/EmissionFactor/list/'); // Cambia la URL según tu configuración
                const json = await response.json();
                console.log("API Response:", json);
                setData(json);
                setData(json.instruments);
                console.log(data);
            } catch (error) {
                console.error('Error fetching instrument cost data:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="chart-container"> {/* Contenedor principal con borde, fondo blanco y sombra */}
            <div className="chart-header">
                <h1 className="chart-title">Emissions</h1> {/* Título */}
            </div>
            <div className="instrument-cost-container">
                {data.map((item, index) => (
                    <div className="instrument-card" key={index}>
                        <div className="instrument-header">
                            <span className="instrument-name">{item.instrument}</span>
                            <span className="instrument-unit">(gCO2eq/kWh)</span>
                        </div>
                        <div className="instrument-value">{item.carbon_intensity}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmissionList;
