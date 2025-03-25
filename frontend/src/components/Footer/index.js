import React from "react";
import "./index.css";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Linkedin from "../../assets/linkedin.png";
import Twitter from "../../assets/twitter.png";

import LogoImg from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Company Info */}
        <div className="footer-section">
          <img src={LogoImg} alt="logo" className="logo-img" />
          <h2 className="footer-logo">SAS ENERGY</h2>
          <div className="footer-icons">
            <img src={Facebook} alt="facebook" className="footer-icon" />
            <img src={Instagram} alt="instagram" className="footer-icon" />
            <img src={Linkedin} alt="linkedin" className="footer-icon" />
            <img src={Twitter} alt="twitter" className="footer-icon" />
          </div>
        </div>

        {/* Middle Section - Contact Info */}
        <div className="footer-section">
          <h3 className="footer-head">Phone</h3>
          <p className="footer-para">+12(456)658 78</p>
          <p className="footer-para">+12(518)451 45</p>
          <h3 className="footer-head">Email</h3>
          <p className="footer-para">support@gmail.com</p>
          <p className="footer-para">support@gmail.com</p>
        </div>

        {/* Middle Section - Resources */}
        <div className="footer-section">
          <h3 className="footer-head">Resources</h3>
          <p className="footer-para">Blog</p>
          <p className="footer-para">Testimonials</p>
          <p className="footer-para">FAQs</p>
          <p className="footer-para">Contact Us</p>
        </div>
        <div className="footer-section">
        <h3 className="footer-head">Services</h3>
        <p className="footer-para">Solar Power Plants</p>
        <p className="footer-para">Solar Grid Tied Inverters</p>
        <p className="footer-para">Solar Off Grid Inverters</p>
        <p className="footer-para">Solar Water Pumping Solutions</p>
        <p className="footer-para">Solar Water Heating Systems</p>
        <p className="footer-para">Solar LED Street Lighting System</p>
        <p className="footer-para">Solar & UPS Power Batteries</p>
        <p className="footer-para">Solar Fencing</p>
      </div>
      </div>

      

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-non-link">Copyright @ 2025 Sas Energy Inc. All right reserved.</p>
        <div className="footer-links">
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy & Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
