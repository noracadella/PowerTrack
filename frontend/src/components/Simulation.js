import React, { useState } from "react";

const Simulation = () => {
  // Estados para la simulación
  const [selectedParameter, setSelectedParameter] = useState("emissions");
  const [selectedAction, setSelectedAction] = useState("decrease");
  const [result, setResult] = useState({ cost: 0, emissions: 0, strategy: [] });

  // Función para manejar la selección del parámetro (coste, emisiones, riesgo)
  const handleParameterChange = (e) => {
    setSelectedParameter(e.target.value);
  };

  // Función para manejar la acción (aumentar o disminuir)
  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };

  // Función para generar la estrategia en base a las selecciones
  const generateStrategy = async () => {
    let selectedSources = [];

    // Lógica de generación de estrategia basada en el parámetro y la acción seleccionada
    if (selectedParameter === "emissions" && selectedAction === "decrease") {
      selectedSources = ["PV", "Wind", "Hydro"];
    } else if (selectedParameter === "emissions" && selectedAction === "increase") {
      selectedSources = ["Coal", "NaturalGas"];
    } else if (selectedParameter === "costs" && selectedAction === "decrease") {
      selectedSources = ["NaturalGas", "Coal"];
    } else if (selectedParameter === "costs" && selectedAction === "increase") {
      selectedSources = ["PV", "Biomass"];
    } else if (selectedParameter === "risk" && selectedAction === "decrease") {
      selectedSources = ["Coal", "Nuclear"];
    } else if (selectedParameter === "risk" && selectedAction === "increase") {
      selectedSources = ["PV", "Wind"];
    }

    // Llamada al backend para obtener el coste y las emisiones de las fuentes seleccionadas
    try {
      const response = await fetch("http://localhost:8000/SiteInformation/simulation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sources: selectedSources }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Establecemos el resultado con la respuesta del backend
      setResult({
        cost: data.totalCost,
        emissions: data.totalEmissions,
        strategy: selectedSources,
      });
    } catch (error) {
      console.error("Error al obtener los resultados de la simulación:", error);
    }
  };

  return (
      <div>
        <div className="dashboard-header">
          <h1>Energy Strategy Simulation</h1>
        </div>

        <div className="dashboard-grid2">
          <div className="energy-section2">
            <h3>Select a parameter to modify:</h3>
            <label>
              <input
                  type="radio"
                  name="parameter"
                  value="emissions"
                  checked={selectedParameter === "emissions"}
                  onChange={handleParameterChange}
              />
              Emissions
            </label>
            <label>
              <input
                  type="radio"
                  name="parameter"
                  value="costs"
                  checked={selectedParameter === "costs"}
                  onChange={handleParameterChange}
              />
              Costs
            </label>
            <label>
              <input
                  type="radio"
                  name="parameter"
                  value="risk"
                  checked={selectedParameter === "risk"}
                  onChange={handleParameterChange}
              />
              Risk
            </label>
          </div>

          <div className="green-energy2">
            <h3>Select whether you want to increase or decrease:</h3>
            <label>
              <input
                  type="radio"
                  name="action"
                  value="increase"
                  checked={selectedAction === "increase"}
                  onChange={handleActionChange}
              />
              Increase
            </label>
            <label>
              <input
                  type="radio"
                  name="action"
                  value="decrease"
                  checked={selectedAction === "decrease"}
                  onChange={handleActionChange}
              />
              Decrease
            </label>
          </div>
        </div>
        <div className="dashboard-grid3">
          <div className="stats-section2">
            <button className="chart-button2" onClick={generateStrategy}>
              Generate Strategy
            </button>

            <div className="instrument-card" >
                <div className="instrument-header">
                    <span className="instrument-name">Selected sources: <br /> {result.strategy.join(", ")} </span>
                    <span className="instrument-unit">(€/MWh)</span>
                </div>
            </div>
            <div className="instrument-card" >
                <div className="instrument-header">
                    <span className="instrument-name">Total cost: <br /> {result.cost}</span>
                    <span className="instrument-unit">(€/MWh)</span>
                </div>   
            </div>
            <div className="instrument-card" >
                <div className="instrument-header">
                    <span className="instrument-name">Total emissions: <br /> {result.emissions}</span>
                    <span className="instrument-unit">(gCO2eq/kWh)</span>
                </div>
            </div>
            
          </div>
        </div>
      </div>
  );
};

export default Simulation;
