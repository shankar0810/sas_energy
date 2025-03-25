import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function SolarFencingService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services8-image-section">
        <h1 className="services8-head">SOLAR FENCING</h1>
      </div>
      <div className="services8-content-img-section">
        <div className="services8-content-img-right-section"></div>
        <div className="services8-content-img-left-section">
          <h1 className="service8-head2">SOLAR FENCING</h1>
          <p className="service8-para">
            Solar fencing is an electrified security barrier powered by solar
            energy, used for perimeter protection in farms, residential areas,
            and commercial properties. It delivers a non-lethal shock to deter
            intruders and animals while being eco-friendly and low maintenance.
            The system includes solar panels, a battery, an energizer, and fence
            wires. Solar fencing is cost-effective, reliable, and operates even
            during power outages.
          </p>
        </div>
      </div>
      <p className="service8-para2">
        The Solar Perimeter Security Electric Fence system is a modern day
        alternative to conventional methods of fencing to protect your crops &
        property. Electric Fence is an effective way to reducing losses caused
        by animals.
      </p>
      <div className="service8-list-cont">
        <h1 className="service8-head2">
          Special features of the Solar Electric Fence System:
        </h1>
        <ul className="service8-list">
          <li>
            Electric Fence can be built alongside existing fences except in case
            of barbed wire fences.
          </li>
          <li>
            Existing posts can be made use of provided the corner / end poles
            are strong.
          </li>
          <li>The shock does not physically harm animals or human beings.</li>
          <li>
            The Solar Electric Fence System conforms to National and
            international standards
          </li>
          <li>The Solar Energizers are tested by ETDC, Govt. of India</li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default SolarFencingService;
