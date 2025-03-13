import { useState, useEffect } from "react";
import gsap from "gsap";
import "./App.css";

function App() {
  // Calculator Mode: 'revenue' (default) or 'traffic'
  const [mode, setMode] = useState("revenue");

  // Shared Inputs
  const [conversionRate, setConversionRate] = useState(2);
  const [visitors, setVisitors] = useState(2000);

  // Revenue Calculator Inputs
  const [revenuePerPatient, setRevenuePerPatient] = useState(450);
  const [animatedRevenue, setAnimatedRevenue] = useState(0);

  // Traffic Value Calculator Inputs
  const [adCostPerClick, setAdCostPerClick] = useState(3.5);
  const [animatedAdCost, setAnimatedAdCost] = useState(0);
  const [animatedEquivalentTraffic, setAnimatedEquivalentTraffic] = useState(0);

  // Calculate Values
  const calculatedRevenue = (conversionRate / 100) * visitors * revenuePerPatient;
  const calculatedEquivalentTraffic = (visitors * (conversionRate / 100)) / 0.01; // Adjusting for 1% baseline conversion
  const calculatedAdCost = calculatedEquivalentTraffic * adCostPerClick; // FIXED FORMULA

  // GSAP Animation for Revenue
  useEffect(() => {
    gsap.to({ value: animatedRevenue }, {
      value: calculatedRevenue,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        setAnimatedRevenue(this.targets()[0].value);
      },
    });
  }, [calculatedRevenue]);

  // GSAP Animation for PPC Cost & Equivalent Traffic
  useEffect(() => {
    gsap.to({ value: animatedEquivalentTraffic }, {
      value: calculatedEquivalentTraffic,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        setAnimatedEquivalentTraffic(this.targets()[0].value);
      },
    });

    gsap.to({ value: animatedAdCost }, {
      value: calculatedAdCost,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        setAnimatedAdCost(this.targets()[0].value);
      },
    });
  }, [calculatedAdCost, calculatedEquivalentTraffic]);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Your Website’s Biggest Expense? The Patients You Never See.</h1>
        <p>See how much revenue you could be making with better conversion.</p>
      </div>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button className={mode === "revenue" ? "active" : ""} onClick={() => setMode("revenue")}>
          Revenue
        </button>
        <button className={mode === "traffic" ? "active" : ""} onClick={() => setMode("traffic")}>
          Traffic Value
        </button>
      </div>

      {/* Calculator Wrapper */}
      <div className="calculator-wrapper">
        {/* Shared Inputs */}
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
                step="0.5"
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

          {/* Revenue Calculator */}
          {mode === "revenue" && (
       <div className="input-group">
       <label>Revenue Per Patient</label>
       <p>What’s the average value of a new patient?</p>
       <div className="input-prefix">
         <span>$</span>
         <input
           type="number"
           value={revenuePerPatient}
           onChange={(e) => setRevenuePerPatient(Number(e.target.value))}
         />
       </div>
     </div>
     
          )}

          {/* Traffic Value Calculator */}
          {mode === "traffic" && (
        <div className="input-group">
        <label>Ad Cost Per Click</label>
        <p>How much does it cost per click in Google PPC?</p>
        <div className="input-prefix">
          <span>$</span>
          <input
            type="number"
            value={adCostPerClick}
            onChange={(e) => setAdCostPerClick(Number(e.target.value))}
          />
        </div>
      </div>
      
          )}
        </div>

        {/* Output Section */}
        <div className="revenue">
          {mode === "revenue" ? (
            <>
              <p>Total Revenue per Month**</p>
              <h2>
                {animatedRevenue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h2>
            </>
          ) : (
            <>
              <p>Google PPC Ad Cost</p>
              <h2 className="cost" >
                {animatedAdCost.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h2>
              <p>Equivalent Organic Traffic</p>
              <h2>
                {Math.round(animatedEquivalentTraffic).toLocaleString("en-US")} visitors
              </h2>
            </>
          )}
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
