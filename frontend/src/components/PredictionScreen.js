import React, { useState } from 'react';
import "../css/RiskSelector.css";
import "../css/LineChartCard.css";
import "../css/Projection.css";

const PredictionScreen = () => {

    const [selectedRisk, setSelectedRisk] = useState("low");

    const riskDescriptions = {
        low: "Low risk: Minimal cost fluctuation. Prices are mostly fixed, providing high stability. 100% fixed price.",
        medium: "Medium risk: Moderate exposure to market prices. 50% fixed price (future market) and 50% variable price (spot market). ",
        high: "High risk: High exposure to price changes. Costs fluctuate based entirely on the spot market. 20% fixed price and 80% variable price (spot market)."
    };

    const [selectedBudget, setSelectedBudget] = useState("low");

    const expectedBudget = {
        low: "501.228 €",
        medium: "548.035 €",
        high: "576.120 €"
    }

    const handleRiskChange = (event) => {
        setSelectedRisk(event.target.value);
        setSelectedBudget(event.target.value);
    };

    return (
        <div>
            <h1>Cost Projection</h1>
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

            <div className="budget-comparison">
                <div className="budget-row">
                    <div className="budget-item">
                        <p className="chart-title">Budget 2025</p>
                        <p className="budget-value">485.472€</p>
                        <p className="info-text">Total price (OMIE): 68,09 €/MWh </p>
                        <p className="info-text">SITE CONSUMPTION GRID supply: 8.423.380 kWh</p>
                        <p className="info-text">ONSITE SOLAR SYSTEM PRODUCTION: 1.293.527 kWh</p>
                    </div>
                    <div className="budget-item">
                        <p className="chart-title">Expected 2026</p>
                        <p className="budget-value">{expectedBudget[selectedBudget]}</p>
                        <p className="info-text">Expected Avarage Price (OMIE): 83.43 €/MWh </p>
                        <p className="info-text">SITE CONSUMPTION GRID supply: 8.423.380 kWh</p>
                        <p className="info-text">ONSITE SOLAR SYSTEM PRODUCTION: 1.293.527 kWh</p>
                        <p className='info-text'>Expected average price for upcoming fixed-price contracts: 70.30 €</p>
                    </div> 
                </div>
            </div>

            <div className="container">
      <div className="section">
        <h2 className="section-title">Notices</h2>
        <ul className="list">
          <li>
            <p>OMIE maintains its goal of implementing the 15-minute product in the intraday market by March 2025</p>
            <span className="date">29/10/2024</span>
          </li>
          <li>
            <p>The NEMOs and TSOs have launched an informal questionnaire on the potential future use of co-optimized products for balancing and energy reserves in the SDAC</p>
            <span className="date">08/10/2024</span>
          </li>
          <li>
            <p>The seventh meeting of the Market Coupling Consultative Group (MCCG) will be held on November 8</p>
            <span className="date">30/09/2024</span>
          </li>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-title">Press Releases</h2>
        <ul className="list">
          <li>
            <p>The 15-minute products will come into effect in June 2025 in the European day-ahead market (SDAC)</p>
            <span className="date">19/12/2024</span>
          </li>
          <li>
            <p>OMIE begins operating the new European intraday auctions (IDAs)</p>
            <span className="date">18/06/2024</span>
          </li>
          <li>
            <p>The NEMOs implement the new European intraday auctions (IDAs)</p>
            <span className="date">14/06/2024</span>
          </li>
        </ul>
      </div>
    </div>
        </div>
    );
};

export default PredictionScreen;
