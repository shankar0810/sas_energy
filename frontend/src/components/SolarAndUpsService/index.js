import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function SolarAndUpsService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services7-image-section">
        <h1 className="services7-head">SOLAR & UPS POWER BATTERIES</h1>
      </div>
      <div className="services7-content-img-section">
        <div className="services7-content-img-left-section">
          <h1 className="service7-head2">SOLAR & UPS POWER BATTERIES</h1>
          <p className="service7-para">
            Solar & UPS Power Batteries store energy for backup power and
            off-grid applications, ensuring uninterrupted electricity supply.
            Lithium-ion and lead-acid batteries are commonly used, with lithium
            offering higher efficiency and longer lifespan. Solar batteries
            store excess solar energy for later use, while UPS batteries provide
            instant backup during power outages. Choosing the right battery
            depends on capacity, durability, and energy needs.
          </p>
        </div>
        <div className="services7-content-img-right-section"></div>
      </div>
      <div className="service7-list-cont">
      <h1 className="service7-head2">FEATURES:</h1>
      <ul className="service7-list">
        <li>MPPT Charge Controller</li>
        <li>DSP Controlled Digital Design</li>
        <li>Sleek & Compact</li>
        <li>In Built Data Logger</li>
        <li>Remote Monitoring</li>
        <li>IP 65 Enclosure</li>
        </ul>
        </div>
      <Footer />
    </>
  );
}

export default SolarAndUpsService;
