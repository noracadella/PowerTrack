import React, { useState } from "react";
import "../css/chartbutton.css"; // Importamos los estilos específicos para este componente

const ChartButtons = ({ onButtonClick, defaultActive = "Monthly" }) => {
    const [activeButton, setActiveButton] = useState(defaultActive);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // Actualiza el botón activo
        onButtonClick(buttonName); // Comunica el cambio al componente padre
    };

    return (
        <div className="chart-buttons">
            <button
                className={`chart-button ${activeButton === "Daily" ? "active" : ""}`}
                onClick={() => handleButtonClick("Daily")}
            >
                Daily
            </button>
            <button
                className={`chart-button ${activeButton === "Monthly" ? "active" : ""}`}
                onClick={() => handleButtonClick("Monthly")}
            >
                Monthly
            </button>
            <button
                className={`chart-button ${activeButton === "Annually" ? "active" : ""}`}
                onClick={() => handleButtonClick("Annually")}
            >
                Annually
            </button>
        </div>
    );
};

export default ChartButtons;
