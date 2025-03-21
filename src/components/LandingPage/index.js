import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import BlogCard from "../BlogCard";
import TestimonialCarousel from "../Testimonials";
import "./index.css";
import Picture5 from "../../assets/picture5.avif";
import Picture6 from "../../assets/picture6.jpg";
import Picture7 from "../../assets/picture7.jpg";
import Picture8 from "../../assets/picture8.jpg";
import Picture9 from "../../assets/picture9.jpg";
import setting from "../../assets/setting.png";
import solarPanel from "../../assets/solar-panel.png";
import solarPower from "../../assets/solar-power.png";
import Testimonial1 from "../../assets/testimonial-1.jpg";
import Testimonial2 from "../../assets/testimonial-2.jpg";
import Testimonial3 from "../../assets/testimonial-3.jpg";
import Testimonial4 from "../../assets/testimonial-4.jpg";
import Blog1 from "../../assets/blog-1.jpg";
import Blog2 from "../../assets/blog-2.jpg";
import Blog3 from "../../assets/blog-3.jpg";
import award1 from "../../assets/award1.png";
import award2 from "../../assets/award2.png";
import award3 from "../../assets/award3.png";
import award4 from "../../assets/award4.png";
import award5 from "../../assets/award5.png";
import award6 from "../../assets/award6.png";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi";
import Footer from "../Footer";


const services = [
  {
    id: 1,
    title: "Sun-Powered Services",
    description:
      "Our solar renewable services encompass a wide range of solutions tailored to meet various energy needs we can some me for solar latest in technology.",
    imgSrc: Picture7,
    icon: solarPanel,
  },
  {
    id: 2,
    title: "Redefining Energy Services",
    description:
      "Our solar renewable services encompass a wide range of solutions tailored to meet various energy needs we can some me for solar latest in technology.",
    imgSrc: Picture8,
    icon: solarPower,
  },
  {
    id: 3,
    title: "Integrating Technology Services",
    description:
      "Our solar renewable services encompass a wide range of solutions tailored to meet various energy needs we can some me for solar latest in technology.",
    imgSrc: Picture9,
    icon: setting,
  },
];

const steps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "Connect with us and let's explore your solar potential",
    image: Testimonial1,
  },
  {
    id: 2,
    title: "System Design",
    description: "Customize your solar system and discover financing",
    image: Testimonial2,
  },
  {
    id: 3,
    title: "Installation & Active",
    description: "Upon design approval and financial arrangement",
    image: Testimonial3,
  },
  {
    id: 4,
    title: "System Monitoring",
    description: "Enjoy ongoing support and watch your savings grow",
    image: Testimonial4,
  },
];

const blogData = [
  {
    id: 1,
    title: "Impact of Solar Energy on Reducing Carbon",
    date: "11 Mar",
    image: Blog1, // Replace with actual image
  },
  {
    id: 2,
    title: "The Financial Benefits of Solar Installation",
    date: "11 Mar",
    image: Blog2,
  },
  {
    id: 3,
    title: "How Solar Energy Contributes to Sustainable",
    date: "11 Mar",
    image: Blog3, // Replace with actual image
  },
];

const awards = [award1, award2, award3, award4, award5, award6];

function LandingPage() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const navigate = useNavigate();
  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = isPaused
        ? "running"
        : "paused";
    }
  };



  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="hero-section">
        <div className="hero-section-left-container">
          <p className="green-para-15">Solar Pioneer</p>
          <h1 className="head-40">
            Leading Solar Energy Provider in Telangana State
          </h1>
          <p className="para-20">
            Sri Associates builds on a legacy of successful collaboration
            between pioneers in the solar industry and the TGREDCO{" "}
          </p>
        </div>
        <div className="hero-section-right-container"></div>

        <div className="hero-over-section">
          <div className="hero-over-section-each">
            <h1 className="head-white-40">42,846</h1>
            <p className="para-white-20">SUCCESSFULLY DONE</p>
          </div>

          <div className="hero-over-section-each">
            <h1 className="head-white-40">32,123</h1>
            <p className="para-white-20">INSTALLED CAPACITY</p>
          </div>
        </div>
      </div>
      <div className="solar-container">
        <div className="solar-left">
          <div className="image-container">
            <img src={Picture5} alt="Solar Worker" className="main-image" />
            <div className="success-box">
              <p className="success-rate">86%</p>
              <p>
                Project <br /> Success Rate
              </p>
            </div>
          </div>
          <div className="image-overlay">
            <img src={Picture6} alt="Engineer" className="overlay-image" />
          </div>
        </div>

        <div className="solar-right">
          <p className="company-title">ABOUT COMPANY</p>
          <h2>
            Solar Passion <br /> Unveiled Our Story
          </h2>
          <p className="company-description">
            Our design philosophy is more than aesthetics; it's a dynamic
            process that delves into the heart of each brand, understanding its
            story, values, and aspirations. We believe in the
          </p>
          <div className="progress-section">
            <p>
              <strong>Hybrid Energy</strong>{" "}
              <span className="progress-percent">76%</span>
            </p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "76%" }}></div>
            </div>

            <p>
              <strong>Wind Turbines</strong>{" "}
              <span className="progress-percent">60%</span>
            </p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="discover-btn">DISCOVER MORE</button>
          </div>
        </div>
      </div>
      <section className="services-container">
        <div className="services-header">
          <p className="services-subtitle">OUR SERVICES</p>
          <h2 className="services-title">
            Solar Renewable Services For A Greener World
          </h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={service.id} className="service-card">
              <img
                src={service.imgSrc}
                alt={service.title}
                className="service-image"
              />
              <div className="service-content white-card">
                <div className="service-icon-cont">
                  <img
                    className="service-icon"
                    src={service.icon}
                    alt="service.title"
                  />
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <button className="read-more">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TestimonialCarousel />
      <div className="work-process">
        <h3 className="subtitle">HOW IT WORKS</h3>
        <h2 className="title">Our Work Process</h2>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-wrapper" key={step.id}>
              {/* Step Circle Button */}
              <div className="step-button">STEP {step.id}</div>

              {/* Step Card */}
              <div className="step-card">
                <img src={step.image} alt={step.title} className="step-image" />
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-line"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="blog-section">
        <h4 className="blog-subtitle">FROM THE BLOG</h4>
        <div className="blog-top-sec">
          <h1 className="blog-sec-title">Latest News & Blog</h1>
          <button className="more-blog">MORE BLOG</button>
        </div>
        <div className="blog-container">
          {blogData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      <div className="awards-section">
        <h1 className="awards-head">OUR AWARDS</h1>

        <div className="marquee-container">
          <button className="pause-button" onClick={togglePause}>
            {isPaused ? (
              <HiOutlinePlay style={{ fontSize: "35px", strokeWidth: "1.5" }} />
            ) : (
              <HiOutlinePause
                style={{ fontSize: "35px", strokeWidth: "1.5" }}
              />
            )}
          </button>
          <div className="marquee-wrapper">
            <div className="marquee" ref={marqueeRef}>
              {awards.concat(awards).map((award, index) => (
                <img
                  key={index}
                  src={award}
                  alt={`Award ${index + 1}`}
                  className="marquee-item"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="login-section">
        <h1 className="login-sec-head">Admin's Section</h1>
        <div className="login-button-section">
          <button className="login-button" onClick={handleSignUp}>Sign Up</button>
          <button className="login-button" onClick={handleSignIn}>Sign In</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default LandingPage;
