import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

function SolarGridTiedService() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="services2-image-section">
        <h1 className="services2-head">SOLAR GRID TIED INVERTERS</h1>
      </div>
      <div className="services2-content-img-section">
        <div className="services2-content-img-right-section"></div>
        <div className="services2-content-img-left-section">
          <h1 className="service2-head2">SOLAR GRID TIED INVERTERS</h1>
          <p className="service2-para">
            Net metering helps reduce energy demand during peak summer hours
            while allowing solar users to earn credits and lower their
            electricity bills. Smaller systems can still offset most energy
            needs due to the higher value of excess electricity. Larger systems
            can store surplus power on the grid, reducing reliance on utilities.
            Additionally, both central and state subsidies are available to
            support solar adoption.
          </p>
        </div>
      </div>
      <p className="service2-para2">
        Net metering is designed to reduce demand during long, hot summer days
        when energy demand is heaviest, while providing energy credits that
        allow solar producers to reduce their electric bill and even sell energy
        back to the utility company.
      </p>
      <p className="service2-para2">
        Net metering offers additional benefits, depending on the size of your
        solar panel system. If you purchase a smaller, less expensive system,
        you can still offset most or all of your needs because of the higher
        value of your excess electricity.
      </p>
      <p className="service2-para2">
        If you purchase a larger system, you can "bank" or store your excess
        electricity on the grid and offset all of the electricity you would
        otherwise purchase from your utility. Avail Central and State Subsidy
      </p>
      <div className="service2-list-cont">
      <h1 className="service2-head2">ADVANTAGES OF SOLAR NET METERING IN INDIA:</h1>
      <ul className="service2-list">
        <li>Most important advantage is that we can inject excess power from the panels to the grid</li>
        <li>Net meters also provide information on energy saved by the system.</li>
        <li> It calculates 'power credits' on power injected into the grid</li>
        <li>It encourages us to save power using 'Time of Use and other unique features present in modern net-meters</li>
        <li>It reduces the pressure on the grid.</li>
        <li>Power can be also provided to neighboring homes</li>
        <li>It reduces transmission losses.</li>
        <li>It makes the user more conscious of energy usage.</li>
        </ul>
        </div>
      <Footer />
    </>
  );
}

export default SolarGridTiedService;
