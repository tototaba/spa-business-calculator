import { useState, useEffect } from "react";
import gsap from "gsap";
import "./App.css";

function App() {
  // Calculator Mode: 'revenue' (default) or 'traffic'
  const [mode, setMode] = useState("revenue");

  // Shared Inputs
  const [organicTraffic, setOrganicTraffic] = useState(2000); // Fixed base traffic input

  // Revenue Calculator Inputs
  const [conversionRate, setConversionRate] = useState(1.5); // Normal absolute conversion rate
  const [revenuePerPatient, setRevenuePerPatient] = useState(450);
  const [animatedRevenue, setAnimatedRevenue] = useState(0);

  // Traffic Value Calculator Inputs
  const [increaseInConversionRate, setIncreaseInConversionRate] = useState(0); // Increase over base
  const [adCostPerClick, setAdCostPerClick] = useState(3.5);
  const [animatedAdCost, setAnimatedAdCost] = useState(0);
  const [animatedEquivalentTraffic, setAnimatedEquivalentTraffic] = useState(0);

  // **Revenue Calculation (Remains the Same)**
  const calculatedRevenue = (conversionRate / 100) * organicTraffic * revenuePerPatient;

  // **Traffic Value Calculation (NEW)**
  const additionalVisitors = (organicTraffic * increaseInConversionRate) / 1; // Adjusting for 1% baseline
  const calculatedAdCost = additionalVisitors * adCostPerClick;

  // **GSAP Animation for Revenue**
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

  // **GSAP Animation for Traffic Values**
  useEffect(() => {
    gsap.to({ value: animatedEquivalentTraffic }, {
      value: additionalVisitors,
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
  }, [calculatedAdCost, additionalVisitors]);

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
        <div className="calculator">
          {/* Organic Traffic */}
          <div className="input-group">
            <label>Organic Traffic Per Month</label>
            <p>How many visitors come to your site each month?</p>
            <input
              type="number"
              value={organicTraffic}
              onChange={(e) => setOrganicTraffic(Number(e.target.value))}
            />
          </div>

          {/* Revenue Mode Inputs */}
          {mode === "revenue" && (
            <>
              <div className="input-group">
                <label>Conversion Rate</label>
                <p>What percentage of visitors become patients?</p>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                  />
                  <span className="slider-value">{conversionRate}%</span>
                </div>
              </div>

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
            </>
          )}

          {/* Traffic Value Mode Inputs */}
          {mode === "traffic" && (
            <>
              <div className="input-group">
                <label>Increase in Conversion Rate</label>
                <p>How much higher is your conversion rate?</p>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={increaseInConversionRate}
                    onChange={(e) => setIncreaseInConversionRate(Number(e.target.value))}
                  />
                  <span className="slider-value">+{increaseInConversionRate}%</span>
                </div>
              </div>

              <div className="input-group">
                <label>Ad Cost Per Click</label>
                <p>What’s the average cost per click in Google PPC?</p>
                <div className="input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    value={adCostPerClick}
                    onChange={(e) => setAdCostPerClick(Number(e.target.value))}
                  />
                </div>
              </div>
            </>
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
              <h2 className="cost">
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
        * Industry averages suggest most websites convert at 1-2% unless optimized.CD
      </p>
    </div>
  );
}

export default App;
