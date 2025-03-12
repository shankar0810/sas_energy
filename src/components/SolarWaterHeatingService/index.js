import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function SolarWaterHeatingService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services5-image-section">
        <h1 className="services5-head">SOLAR WATER HEATING SYSTEM</h1>
      </div>
      <div className="services5-content-img-section">
        <div className="services5-content-img-left-section">
          <h1 className="service5-head2">SOLAR WATER HEATING SYSTEM</h1>
          <p className="service5-para">
            A Solar Water Heating System (SWHS) uses solar energy to heat water
            for residential, commercial, and industrial use. It consists of
            solar collectors, a storage tank, and a circulation system. Flat
            plate collectors (FPC) and evacuated tube collectors (ETC) are
            common types. These systems reduce electricity costs, lower carbon
            emissions, and provide an eco-friendly alternative to conventional
            water heaters.
          </p>
        </div>
        <div className="services5-content-img-right-section"></div>
      </div>
      <div className="service5-list-cont">
      <h1 className="service5-head2">FEATURES:</h1>
      <ul className="service5-list">
        <li>Quick heat generation, around 70°C to 80°C water temperatures</li>
        <li>Vacume inside collector tube reduces heat losses.</li>
        <li>  Greater absorber with tri-coated tubes (al/ss/cu)</li>
        <li>Very low heat loss due to PUF insulated storage tank</li>
        <li> System generates reasonable temperature even in cloudy days.</li>
        <li>Maintenance free & easy to clean</li>
        <li> Electrical heater backup for rainy days.</li>
        <li>All Weather proof outer cladding</li>
        <li>Increment in temperature form ambient temperature is 100 to 500C on clear sunny days</li>
        <li>Less area required for installation</li>
        <li>Incase of collector tube damage, tubes can be replaced individually</li>
        <li>Backup is provided for non sunny days</li>
        </ul>
        </div>
      <Footer />
    </>
  );
}

export default SolarWaterHeatingService;
