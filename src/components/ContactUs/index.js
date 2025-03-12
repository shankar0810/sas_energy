import React from "react";
import "./index.css";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiClockClockwiseBold } from "react-icons/pi";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";

function ContactUs() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="contact-us-container">
        <div className="about-us-top-section">
          <h1 className="about-us-head">Contact Us</h1>
        </div>
        <div className="about-us-bottom-section">
          <div className="contact-container">
            {/* Contact Info Boxes */}
            <div className="contact-info">
              <div className="info-box">
                <div className="info-box-icon">
                  <FiPhoneCall style={{ color: "green", fontSize: "20px" }} />
                </div>
                <div className="info-box-text">
                  <p className="info-box-text-p1">Phone: </p>
                  <p className="info-box-text-p2">+123(254)658 58</p>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-icon">
                  <MdOutlineMail style={{ color: "green", fontSize: "20px" }} />
                </div>
                <div className="info-box-text">
                  <p className="info-box-text-p1">Mail: </p>
                  <p className="info-box-text-p2">abc@gmail.com</p>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-icon">
                  <MdOutlineLocationOn style={{ color: "green", fontSize: "20px" }} />
                </div>
                <div className="info-box-text">
                  <p className="info-box-text-p1">Location: </p>
                  <p className="info-box-text-p2">Hyderabad</p>
                </div>
              </div>
              <div className="info-box">
                <div className="info-box-icon">
                  <PiClockClockwiseBold style={{ color: "green", fontSize: "20px" }} />
                </div>
                <div className="info-box-text">
                  <p className="info-box-text-p1">Opening Hours: </p>
                  <p className="info-box-text-p2">9:00 AM to 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form and Map */}
            <div className="contact-content">
              {/* Left - Contact Form */}
              <div className="contact-form">
                <h2>Get in Touch</h2>
                <form>
                  <div className="contact-form-group">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <input type="text" placeholder="Subject" className="contact-us-input" required />
                  <textarea placeholder="Message" rows="5" className="contact-us-textarea" required></textarea>
                  <button type="submit" className="contact-us-submit-btn">SUBMIT</button>
                </form>
              </div>

              {/* Right - Google Map */}
              <div className="contact-map">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25183.464521276864!2d-0.1195434736858446!3d51.50332436807507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760352c73c43a5%3A0xe622f48b2f58a402!2sLondon%20Eye!5e0!3m2!1sen!2sus!4v1614545689743"
                  width="100%"
                  height="460"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
