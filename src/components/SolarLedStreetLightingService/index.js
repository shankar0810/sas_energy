import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function SolarLedStreetLightingService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services6-image-section">
        <h1 className="services6-head">SOLAR LED STREET LIGHTING SYSTEM</h1>
      </div>
      <div className="services6-content-img-section">
        <div className="services6-content-img-right-section"></div>
        <div className="services6-content-img-left-section">
          <h1 className="service6-head2">SOLAR LED STREET LIGHTING SYSTEM</h1>
          <p className="service6-para">
            Increasingly, solar power is being used for street lighting around
            the world. The long term power saving, conservation of precious
            natural resources and elimination of the need for generating
            additional power are leading to the fast adoption of solar street
            lighting systems around the world. In a tropical country like India,
            solar street lighting makes all the more practical sense, given the
            abundance of solar energy round the year.
          </p>
        </div>
      </div>
      <div className="service6-list-cont">
        <h1 className="service6-head2">
          Comparison between solar powered LED street light and conventional
          lighting:
        </h1>
        <p className="service6-para2 no-space2">
          LED street lighting also brings many social benefits. Replacing 10,000
          pcs of HPS street lights with LED street lights will result in a
          saving of 5,550,000KWH of electricity. Less power consumption would
          result in a reduction of coal consumption, and bring down exhaust
          emissions such as sulfide and carbide.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default SolarLedStreetLightingService;
