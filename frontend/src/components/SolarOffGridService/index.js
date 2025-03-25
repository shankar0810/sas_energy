import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function SolarOffGridService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services3-image-section">
        <h1 className="services3-head">SOLAR OFF GRID INVERTERS (MPPT/PWM)</h1>
      </div>
      <div className="services3-content-img-section">
        <div className="services3-content-img-left-section">
          <h1 className="service3-head2">
            SOLAR OFF GRID INVERTERS (MPPT/PWM)
          </h1>
          <p className="service3-para">
            Solar off-grid inverters (MPPT/PWM) convert DC power from solar
            panels into AC for standalone systems. MPPT inverters maximize
            energy efficiency by adjusting voltage, ideal for larger setups. PWM
            inverters are cost-effective and suitable for smaller systems with
            lead-acid batteries. MPPT offers better performance in varying
            sunlight, while PWM is a simpler, budget-friendly option.
          </p>
        </div>
        <div className="services3-content-img-right-section"></div>
      </div>
      <div className="service3-list-cont">
        <h1 className="service3-head2">FEATURES:</h1>
        <ul className="service3-list">
          <li>
            No Need to change the existing Inverter / UPS v Dual Charging Modes
            Solar /Inverter
          </li>
          <li>Virtually Maintenance-Free Design</li>
          <li>Indications: Grid Charging & Solar Charging</li>
          <li>Protections: FUSE Inverter Load</li>
          <li>Built-in overcharge and undercharge protection.</li>
          <li>
            Available in 5A/ 10A/20A/40A / PWM and MPPT charge controllers
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default SolarOffGridService;
