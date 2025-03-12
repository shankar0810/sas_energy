import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/logo.png";
import { IoIosArrowBack } from "react-icons/io";

const services = [
  { title: "Solar Power Plants", path: "/service-power-plant" },
  { title: "Solar Grid Tied Inverters", path: "/service-solar-grid" },
  { title: "Solar Off Grid Inverters", path: "/service-solar-offgrid" },
  { title: "Solar Water Pumping Solutions", path: "/service-solar-water-pumping" },
  { title: "Solar Water Heating Systems", path: "/service-solar-water-heating" },
  { title: "Solar LED Street Lighting System", path: "/service-solar-led-street-lighting" },
  { title: "Solar & UPS Power Batteries", path: "/service-solar-ups" },
  { title: "Solar Fencing", path: "/service-solar-fencing" },
];

function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileServicesOpen(false);
  };

  const openMobileServices = () => {
    setIsMobileServicesOpen(true);
  };

  const closeMobileServices = () => {
    setIsMobileServicesOpen(false);
  };

  return (
    <>
      <div className="nav-row-container">
        {/* Left Logo Section */}
        <div className="nav-left-content">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        {/* Navigation Links for Desktop */}
        <div className="nav-right-content">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item" onClick={toggleServices}>
              <span
                className={`dropdown-toggle ${isServicesOpen ? "open" : ""}`}
              >
                Services <span className="arrow"></span>
              </span>
              {isServicesOpen && (
                <ul className="services-popup">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        to={service.path}
                        className="service-link"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/projects" className="nav-link">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/awards" className="nav-link">
                Awards
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav-container">
        <img src={logo} alt="logo" className="logo-img" />

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Navigation Links */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          {!isMobileServicesOpen ? (
            <ul>
              <li>
                <Link
                  to="/"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </Link>
              </li>
              <li onClick={openMobileServices} className="mobile-nav-link">
                Services
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/awards"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  Awards
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          ) : (
            <div className="services-menu">
              {/* Back Arrow Positioned Absolutely */}
              <div
                className="back-button-container"
                onClick={closeMobileServices}
              >
                <IoIosArrowBack style={{ color: "white", fontSize: "40px" }} />
              </div>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      className="mobile-service-link"
                      onClick={toggleMobileMenu}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
