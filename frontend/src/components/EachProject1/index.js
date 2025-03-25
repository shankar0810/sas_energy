import React from "react";

import Navbar from "../Navbar";
import TopBanner from "../TopBanner";
import Footer from "../Footer";
import Project3 from "../../assets/projects-3.avif";
import ProjectDetails from "../../assets/project-details-1.avif";
import { FaCheckCircle } from "react-icons/fa";
import "./index.css";

function EachProject1() {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <>
      <TopBanner />
      <Navbar />

      <div className="each-project-container">
        <div className="each-project-top-section">
          <h1 className="about-us-head">Project Details</h1>
        </div>
        <div className="each-project-bottom-section">
          <div className="each-project-content">
            <div className="each-project-image">
              <img src={Project3} alt="Project" />
            </div>
            <div className="each-project-details">
              <h2 className="each-project-title">A Large Company</h2>
              <p className="each-project-description">
                Aliquam eros justo, posuere lobortis vive rra laoreet matti
                ullamc orper posu ere viverra. Aliquam eros justo, posuere
                lobortis non, vive rra laoreet augue mattis fermentum
                ullamcorper viverra laoreet Aliquam eros justo.
              </p>

              {/* Info Grid */}
              <div className="each-project-info">
                <div className="each-project-info-each">
                  <span className="each-project-info-label">Client</span>
                  <span className="each-project-info-value">
                    Sandi leo rakiul
                  </span>
                </div>
                <div className="each-project-info-each">
                  <span className="each-project-info-label">Category</span>
                  <span className="each-project-info-value">
                    Planning, Real Estate
                  </span>
                </div>
                <div className="each-project-info-each">
                  <span className="each-project-info-label">Budget</span>
                  <span className="each-project-info-value">150000 USD</span>
                </div>
                <div className="each-project-info-each">
                  <span className="each-project-info-label">Date</span>
                  <span className="each-project-info-value">
                    November 19, 2022
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="each-project-testimonials">
            <div className="each-project-testimonial-card">
              <div className="each-project-testimonial-left-content">
                <div className="each-project-testimonial-img-container">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Testimonial"
                    className="each-project-testimonial-img"
                  />
                </div>
                <div className="each-project-testimonial-text-cont">
                  <h4 className="each-project-head-24">Cody Fisher</h4>
                  <p className="each-project-testimonial-title">Customer</p>
                </div>
              </div>
              <div className="each-project-testimonial-right-content">
                <div className="each-project-rating-cont">{renderStars(4)}</div>
                <p className="each-project-testimonial-text">
                  Customers have to say about us! we have helped thousand
                  people. Don't just take our word for it hear what our
                  customers have to say about us!
                </p>
              </div>
            </div>
            <div className="each-project-testimonial-card">
              <div className="each-project-testimonial-left-content">
                <div className="each-project-testimonial-img-container">
                  <img
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    alt="Testimonial"
                    className="each-project-testimonial-img"
                  />
                </div>
                <div className="each-project-testimonial-text-cont">
                  <h4 className="each-project-head-24">Fishcer</h4>
                  <p className="each-project-testimonial-title">Customer</p>
                </div>
              </div>
              <div className="each-project-testimonial-right-content">
                <div className="each-project-rating-cont">{renderStars(5)}</div>
                <p className="each-project-testimonial-text">
                  Customers have to say about us! we have helped thousand
                  people. Don't just take our word for it hear what our
                  customers have to say about us!
                </p>
              </div>
            </div>
          </div>
          <div className="each-project-challenge-container">
            <h2 className="each-project-challenge-title">
              Project Challenging story
            </h2>
            <p className="each-project-challenge-description">
              Aliquam eros justo, posuere lobortis vive rra laoreet matti ullamc
              orper posu ere viverra. Aliquam eros justo, posuere lobortis non,
              vive rra laoreet augue mattis fermentum ullamcorper viverra
              laoreet Aliquam eros justo, posuere lobortis viverra laoreet mat
              ullamcorper posue viverra.
            </p>

            <div className="each-project-challenge-content">
              {/* Text Content */}
              <div className="each-project-challenge-text">
                <div className="each-project-challenge-item">
                  <div className="each-project-challenge-item-row">
                    <FaCheckCircle
                      style={{
                        color: "green",
                        fontSize: "20px",
                        
                      }}
                    />
                    <h4 className="each-project-item-title">
                      Best Implementation
                    </h4>
                  </div>

                  <p className="each-project-item-description">
                    Ished fact that a reader will be distrol acted bioily desig
                    ished fact that a reader will.
                  </p>
                </div>

                <div className="each-project-challenge-item">
                  <div className="each-project-challenge-item-row">
                    <FaCheckCircle
                      style={{
                        color: "green",
                        fontSize: "20px",
                      }}
                    />
                    <h4 className="each-project-item-title">
                      Design make for you.
                    </h4>
                  </div>

                  <p className="each-project-item-description">
                    Ished fact that a reader will be distrol acted bioily desig
                    the.ished fact that.
                  </p>
                </div>

                <div className="each-project-challenge-item">
                  <div className="each-project-challenge-item-row">
                    <FaCheckCircle
                      style={{
                        color: "green",
                        fontSize: "20px",
                      }}
                    />
                    <h4 className="each-project-item-title">
                      Best Implementation
                    </h4>
                  </div>

                  <p className="each-project-item-description">
                    Ished fact that a reader will be distrol acted bioily desig
                    ished fact that a reader will.
                  </p>
                </div>

                <div className="each-project-challenge-item">
                  <div className="each-project-challenge-item-row">
                    <FaCheckCircle
                      style={{
                        color: "green",
                        fontSize: "20px",
                      }}
                    />
                    <h4 className="each-project-item-title">
                      Design make for you.
                    </h4>
                  </div>

                  <p className="each-project-item-description">
                    Ished fact that a reader will be distrol acted bioily desig
                    the.ished fact that.
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="each-project-challenge-image">
                <img src={ProjectDetails} alt="Project Challenge" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EachProject1;
