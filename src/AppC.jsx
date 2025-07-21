import { useState, useEffect } from "react";
import "./AppC.css";

import IconInjectables from "./assets/icon-inj.png";
import IconLaser from "./assets/icon-laser.png";
import IconHormone from "./assets/icon-hormone.png";
import IconIV from "./assets/icon-iv.png";
import IconSkincare from "./assets/icon-skin-care.png";
import IconHairRes from "./assets/icon-hair-res.png";
import IconAntiAge from "./assets/icon-anit-age.png";
import IconMedWeightLoss from "./assets/icon-med-wl.png";

function MedSpaProfitCalculator() {
  const [state, setState] = useState("");
  const [numPractitioners, setNumPractitioners] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [clientsPerWeek, setClientsPerWeek] = useState("");
  const [avgRevenuePerClient, setAvgRevenuePerClient] = useState("");
  const [showExpensesDetail, setShowExpensesDetail] = useState(false);
  const [editingInputs, setEditingInputs] = useState(false);

  const baseMonthlyExpenses = 5400;

  const services = [
    { name: "Skincare", cost: 5000, monthlyOp: 800, icon: IconSkincare, avgRevenue: 120, clientsPerWeek: 18 },
    { name: "Laser", cost: 100000, monthlyOp: 1200, icon: IconLaser, avgRevenue: 350, clientsPerWeek: 12 },
    { name: "Hormone", cost: 3000, monthlyOp: 400, icon: IconHormone, avgRevenue: 220, clientsPerWeek: 14 },
    { name: "Injectables", cost: 7000, monthlyOp: 1000, icon: IconInjectables, avgRevenue: 450, clientsPerWeek: 16 },
    { name: "IV", cost: 10000, monthlyOp: 900, icon: IconIV, avgRevenue: 180, clientsPerWeek: 20 },
    { name: "Hair Restoration", cost: 12000, monthlyOp: 850, icon: IconHairRes, avgRevenue: 300, clientsPerWeek: 10 },
    { name: "Anti-Aging", cost: 8000, monthlyOp: 700, icon: IconAntiAge, avgRevenue: 250, clientsPerWeek: 15 },
    { name: "Medical Weight Loss", cost: 4000, monthlyOp: 500, icon: IconMedWeightLoss, avgRevenue: 270, clientsPerWeek: 18 }
  ];
  

  const handleSelectService = (service) => {
    setSelectedService(service.name === selectedService ? null : service.name);
  };

  const activeService = services.find((s) => s.name === selectedService);

  useEffect(() => {
    if (activeService && numPractitioners && !editingInputs) {
      setClientsPerWeek((activeService.clientsPerWeek * Number(numPractitioners)).toString());
      setAvgRevenuePerClient(activeService.avgRevenue.toString());
    }
  }, [activeService, numPractitioners, editingInputs]);

  const amortizedCost = activeService ? activeService.cost / 36 : 0;
  const addedMonthlyOps = activeService ? activeService.monthlyOp : 0;

  const totalMonthlyExpenses = baseMonthlyExpenses + amortizedCost + addedMonthlyOps;
  const totalRevenue = Number(clientsPerWeek) * 4 * Number(avgRevenuePerClient);
  const totalProfit = totalRevenue - totalMonthlyExpenses;

  const inputsFilled = selectedService && state && numPractitioners;

  return (
    <div className="calculator-container">
      <h1>Med Spa Profit Calculator</h1>

      <div className="services-offered">
        <p>Select a Service</p>
        <div className="service-icons">
          {services.map((service) => (
            <button
              key={service.name}
              className={`service-button ${selectedService === service.name ? "active" : ""}`}
              onClick={() => handleSelectService(service)}
            >
              <img src={service.icon} alt={service.name} className="icon-img" />
              <span>{service.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="input-pair-row">
        <div className="input-box">
          <label>State</label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
          </select>
        </div>

        <div className="input-box">
          <label># of Practitioners</label>
          <input
            type="number"
            value={numPractitioners}
            onChange={(e) => setNumPractitioners(e.target.value)}
          />
        </div>
      </div>

      <div className="input-pair-row">
        <div className="input-box">
          <label>Estimated Clients per Week</label>
          <input
            type="number"
            value={clientsPerWeek}
            onChange={(e) => {
              setClientsPerWeek(e.target.value);
              setEditingInputs(true);
            }}
          />
        </div>
        <div className="input-box">
          <label>Avg Revenue per Client</label>
          <input
            type="number"
            value={avgRevenuePerClient}
            onChange={(e) => {
              setAvgRevenuePerClient(e.target.value);
              setEditingInputs(true);
            }}
          />
        </div>
      </div>

      <div className="expenses-section">
        <p>Est Monthly Expenses</p>
        <h2 onClick={() => setShowExpensesDetail(!showExpensesDetail)}>
          ${Math.round(inputsFilled ? totalMonthlyExpenses : 0).toLocaleString()} {" "}
          <span style={{ fontSize: "1.2rem", color: "#999" }}>
            {showExpensesDetail ? "▲" : "▼"}
          </span>
        </h2>
        {showExpensesDetail && (
          <ul className="expense-list">
            <li>Base Ops: ${Math.round(baseMonthlyExpenses).toLocaleString()}</li>
            <li>Service Ops: ${Math.round(addedMonthlyOps).toLocaleString()}</li>
            <li>Amortized Equipment: ${Math.round(amortizedCost).toLocaleString()}</li>
          </ul>
        )}
      </div>

      <div className="profit-section">
        <p>Total Profit</p>
        <h1>${inputsFilled && !isNaN(totalProfit) ? Math.round(totalProfit).toLocaleString() : "0"}</h1>
      </div>
    </div>
  );
}

export default MedSpaProfitCalculator;
