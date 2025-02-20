import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaLinkedin,FaTwitter,FaInstagram } from "react-icons/fa";

import "./index.css";

const TopBanner = () => {
  return (
    <div className="row-container">
      <div className="left-content">
        <div className="each-list align-left">Using your feedback to create a million dollar</div>
        <div className="each-list">
            <FaPhoneAlt className="icon" style={{color:"#368034"}}/>
            <p>(+91)1234567890</p>
        </div>
        <div className="each-list">
            <FaEnvelope className="icon" style={{color:"#368034"}}/>
            <p>info@gmail.com</p>
        </div>
        <div className="each-list">
            <FaLocationDot className="icon" style={{color:"#368034"}}/>
            <p>India</p>
        </div>
      </div>
      <div className="right-content"><span className="para-12">Follow on:</span>
                 <div className="icons-container">
                  <FaInstagram/>
                  <FaTwitter/>
                  <FaLinkedin/>
                  <FaFacebookF/>
                </div>
             
      </div>
    </div>
  );
};

export default TopBanner;
