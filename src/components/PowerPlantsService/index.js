import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function PowerPlantService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services-image-section">
        <h1 className="services-head">SOLAR POWER PLANTS</h1>
      </div>
      <div className="services-content-img-section">
        <div className="services-content-img-left-section">
          <h1 className="service-head2">SOLAR POWER PLANTS</h1>
          <p className="service-para">
            SRI ASSOCIATES Solar Power Pack comes as standard kits for home and
            small office power solutions. These units have been designed for
            simple and faster installation with maintenance free operation. The
            power pack can run power loads from domestic appliances like LED/CFL
            lights, Fans, TV, Computer, Refrigerator. The Solar Power pack
            reduces your peak energy consumption during the day, and thus cuts
            down your power bill. It also provides un interrupted power supply
            during power cutoffs
          </p>
        </div>
        <div className="services-content-img-right-section"></div>
      </div>
      <p className="service-para2">
        The system consists of solar panels, batteries and Power Control Unit
        (PCU) inverter with solar/Main Hybrid charge controller. The CPU
        converts Solar DC power into AC with charging of battery from solar or
        mains with solar as priority. When battery voltage is low, the mains
        charger is turned ON automatically. Next day, when solar radiation is
        available, the cycle repeats. This ensures healthiness of battery,
        thereby increasing the battery life. Battery deep discharge, over charge
        protections are provided inside the PCU. SRI ASSOCIATES has wide range
        of Solar power pack applications, where availability of continuous power
        supply is a necessity.
      </p>
      <Footer />
    </>
  );
}

export default PowerPlantService;
