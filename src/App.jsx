import { useState } from "react";
import "./App.css";

function App() {
  const [conversionRate, setConversionRate] = useState(2);
  const [visitors, setVisitors] = useState(2000);
  const [revenuePerPatient, setRevenuePerPatient] = useState(500);

  const totalRevenue = ((conversionRate / 100) * visitors * revenuePerPatient).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Your Website’s Biggest Expense? The Patients You Never See.</h1>
        <p>See how much revenue you could be making with better conversion.</p>
      </div>

      {/* Calculator & Revenue Display */}
      <div className="calculator-wrapper">
        {/* Input Section */}
        <div className="calculator">
          {/* Conversion Rate */}
          <div className="input-group">
  <label>Conversion Rate</label>
  <p>How many visitors actually book an appointment?</p>
  <div className="slider-container">
    
    <input
      type="range"
      min="1"
      max="20"
      value={conversionRate}
      onChange={(e) => setConversionRate(Number(e.target.value))}
    />
    <span className="slider-value">{conversionRate}%</span>
    
  </div>
  <p className="note" >The average website converts at only 1-2%—unless optimized.*</p>
</div>
          {/* Visitors Per Month */}
          <div className="input-group">
            <label>Visitors Per Month</label>
            <p>How many people visit your site each month?</p>
            <input
              type="number"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
            />
          </div>

          {/* Revenue Per Patient */}
          <div className="input-group">
            <label>Revenue Per Patient</label>
            <p>What’s the average value of a new patient?</p>
            <input
              type="number"
              value={revenuePerPatient}
              onChange={(e) => setRevenuePerPatient(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Revenue Display */}
        <div className="revenue">
          <p>Total Revenue per Month**</p>
          <h2>{totalRevenue}</h2>
        </div>
      </div>

      {/* Footnote */}
      <p className="footnote">
        ** Estimates based on your inputs. Actual results may vary. <br />
        * Industry averages suggest most websites convert at 1-2% unless optimized.
      </p>
    </div>
  );
}

export default App;
