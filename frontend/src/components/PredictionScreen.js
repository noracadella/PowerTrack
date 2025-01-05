import React, { useState } from 'react';
import BarChartCard from "./BarChartCard";
import "../css/RiskSelector.css";

const PredictionScreen = () => {
    const [selectedRisk, setSelectedRisk] = useState("");

    const riskDescriptions = {
        low: "Low risk: Minimal cost fluctuation. Prices are mostly fixed, providing high stability.",
        medium: "Medium risk: Moderate exposure to market prices. Example: 50% fixed price (future market) and 50% variable price (spot market).",
        high: "High risk: High exposure to price changes. Costs fluctuate based entirely on the spot market."
    };

    const handleRiskChange = (event) => {
        setSelectedRisk(event.target.value);
    };

    return (
        <div>
            <h1>Prediction Screen</h1>
            {/* Aquí va el contenido de la pantalla Prediction */}
            <div className="risk-selector-container">
                <label htmlFor="risk-dropdown" className="dropdown-label">
                    Choose the type of risk:
                </label>
                <select
                    id="risk-dropdown"
                    value={selectedRisk}
                    onChange={handleRiskChange}
                    className="risk-dropdown"
                >
                    <option value="">-- Select a risk level --</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                {selectedRisk && (
                    <div className="risk-description-inline">
                        {riskDescriptions[selectedRisk]}
                    </div>
                )}
            </div>

            <BarChartCard activeChart={"Monthly"}/>
        </div>
    );
};

export default PredictionScreen;
