import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TbleImg from '../../assets/service4-table.jpg';
import "./index.css";

function SolarWaterPumpingService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services4-image-section">
        <h1 className="services4-head">SOLAR WATER PUMPING SOLUTIONS</h1>
      </div>
      <div className="services4-content-img-section">
        <div className="services4-content-img-right-section"></div>
        <div className="services4-content-img-left-section">
          <h1 className="service4-head2">SOLAR WATER PUMPING SOLUTIONS</h1>
          <p className="service4-para">
            Solar water pumping solutions use solar energy to power pumps for
            irrigation, livestock watering, and household use. They reduce
            dependency on grid electricity and diesel, making them
            cost-effective and eco-friendly. DC and AC solar pumps are
            available, with MPPT controllers ensuring maximum efficiency. These
            systems are ideal for remote areas, offering reliable water supply
            with minimal maintenance.
          </p>
        </div>
      </div>
      <p className="service4-para2">
        Solar water pumping system is a stand-alone system operating on power
        generated using solar PV (photovoltaic) system.
      </p>
      <div className="service4-list-cont">
        <h1 className="service4-head2">
        AGRI-PUMP SOLUTION:
        </h1>
        <p className="service4-para2 no-space">
        The solution makes the pump run on Solar during the sun shine without any battery.
      </p>
       <img src={TbleImg} alt="table" className="service4-img"/>
      </div>
      <Footer />
    </>
  );
}

export default SolarWaterPumpingService;
