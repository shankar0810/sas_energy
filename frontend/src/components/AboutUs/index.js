import React from "react";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Blog1 from "../../assets/blog-1.jpg";
import Blog2 from "../../assets/blog-2.jpg";
import ProjectIcon from "../../assets/briefing.png";
import AwardIcon from "../../assets/medal.png";
import TeamIcon from "../../assets/team.png";
import ReviewIcon from "../../assets/customer-review.png";
import Testimonial3 from "../../assets/testimonial-3.jpg";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../Footer";
import "./index.css";

function AboutUs() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="about-us-container">
        <div className="about-us-top-section">
          <h1 className="about-us-head">About Us</h1>
        </div>
        <section className="about-us-hero-section">
          {/* Image Section */}
          <div className="about-us-image-container">
            <img
              src={Blog1}
              alt="Worker with drill"
              className="about-us-main-image"
            />
            <img
              src={Blog2}
              alt="Workers discussing"
              className="about-us-small-image"
            />
          </div>

          <div className="about-us-content-container">
            <span className="about-us-about-text">| ABOUT COMPANY</span>
            <h1 className="about-us-h1">
              Innovating for a <br />{" "}
              <span className="about-us-highlight">Sustainable Future</span>
            </h1>
            <p className="about-us-para">
              Sri Associates is a leading solar industry player, providing
              certified solar products across Telangana and Andhra Pradesh. We
              specialize in solar power systems, lighting, water heating, and
              fencing solutions. With a strong network, we have successfully
              installed solar setups for petrol pumps and various organizations.
            </p>
            <button className="about-us-read-more-btn">
              Read More{" "}
              <FaArrowRight style={{ color: "white", paddingLeft: "10px" }} />
            </button>
          </div>
        </section>
        <section className="about-us-row-section">
          <div className="about-us-row-section-each-card">
            <img
              src={ProjectIcon}
              alt="Project Icon"
              className="about-us-icon"
            />
            <h1 className="about-us-head2">1.2K+</h1>
            <p className="about-us-para2">Project Success</p>
          </div>

          <div className="about-us-row-section-each-card">
            <img src={ReviewIcon} alt="Review Icon" className="about-us-icon" />
            <h1 className="about-us-head2">900+</h1>
            <p className="about-us-para2">Client Reviews</p>
          </div>
          <div className="about-us-row-section-each-card">
            <img src={TeamIcon} alt="Team Icon" className="about-us-icon" />
            <h1 className="about-us-head2">200+</h1>
            <p className="about-us-para2">Team Member</p>
          </div>
          <div className="about-us-row-section-each-card">
            <img src={AwardIcon} alt="Project Icon" className="about-us-icon" />
            <h1 className="about-us-head2">20+</h1>
            <p className="about-us-para2">Winning Awards</p>
          </div>
        </section>
        <section className="about-us-experience-container">
          <div className="about-us-experience-content">
            <h4 className="about-us-experience-subtitle">| OUR EXPERIENCE</h4>
            <h2 className="about-us-experience-title">
              Solar Passion <br /> Unveiled Our Story
            </h2>
            <p className="about-us-experience-description">
              Business, or everyday living, imagine a world where solar success
              is not just an aspiration but a reality driven by the Rays of the
              sun.
            </p>

            <div className="about-us-experience-progress">
              <div className="about-us-progress-item">
                <div className="about-us-progress-label">
                  <span>Hybrid Energy</span>
                  <span>76%</span>
                </div>
                <div className="about-us-progress-bar">
                  <div
                    className="about-us-progress-fill"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>

              <div className="about-us-progress-item">
                <div className="about-us-progress-label">
                  <span>Solar Panel</span>
                  <span>85%</span>
                </div>
                <div className="about-us-progress-bar">
                  <div
                    className="about-us-progress-fill"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <div className="about-us-progress-item">
                <div className="about-us-progress-label">
                  <span>Wind Turbines</span>
                  <span>60%</span>
                </div>
                <div className="about-us-progress-bar">
                  <div
                    className="about-us-progress-fill"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-us-experience-image"></div>
        </section>
        <section className="about-us-content-section">
          <h1 className="about-us-head3">ABOUT SRI ASSOCIATES</h1>
          <p className="about-us-para3">
            Sri Associates builds on a legacy of successful collaboration
            between pioneers in the solar industry and the TGREDCO.
          </p>
          <p className="about-us-para3">
            As a responsible corporate citizen and player in a solar industry,
            Sri Associates strives to nurture, promote and sustain energy
            conservation. Also, with our new vision in place, we are sparing no
            effort to achieve excellence in all other aspects of our operations,
            so as to deliver breakthrough performance, benefitting all our
            stakeholders.
          </p>
          <p className="about-us-para3">
            Every referral or opportunity for repeat business represents
            recognition for a job well done more than any award. We offer
            sincere thanks to our clients and partners for allowing us the
            privilege of doing what we love and serving alongside you.
          </p>
          <p className="about-us-para3">
            We are proud to share some of our achievements for building a great
            company with a culture that empowers our people to deliver results.
          </p>
          <p className="about-us-para3">
            We are stockiest and super distributor of Helios/HRtron, Leader,
            Poweron, Elsol(Kevin), G-1 Industries, Sedop, Vispra, Enretech etc.
            We provide standard products as per national and international
            standards of BIS, MNRE, NREDCAP, ISI, TUV, IEC, UV etc. We have our
            dealers located at all districts of Telangana and Andhra Pradesh. We
            are in the approved list of Telangana New and Renewable Energy
            Development Corporation (TNREDC) for I KW and 6 KW to 100 KW Solar
            Systems. We are channel partners for MNRE approved Company.
          </p>
          <p className="about-us-para3">
            Our Country has got vast natural resources. One among them is the
            abundant availability of Solar Power. SAS Energy aim is to generate
            clean and sustainable energy with less cost, thereby reduce Carbon
            Footprint. Under the well-organized business, Sales and service
            network SAS is able to attract large number of customers throughout
            Telangana, Andhra Pradesh and parts of Tamilnadu and Karnataka.
          </p>
          <p className="about-us-para3">
            We are successfully installed many home lighting systems, solar
            street lights, solar water heating systems, solar fencing and
            installed about 35 solar power systems to IOC petrol pumps, BPCL and
            HPCL petrol bunks in Telangana and Andhra pradesh. Apart from the
            above we also deal with CC cameras various sizes and dimentionsand
            installed in various organization like hospitals, colleges.
          </p>
          <div className="about-us-company-profile-section">
            <h1 className="about-us-head4">Company Profile</h1>
            <p className="about-us-para4">
              We are proud to share some of our achievements for building a
              great company with a culture that empowers our people to deliver
              results.
            </p>
            <button className="about-us-download-btn">Download Brochure</button>
          </div>
          <div className="about-us-milestone-section">
            <h1 className="about-us-head3">MILESTONES</h1>
            <ul>
                <li>638 KW On-Grid Solar Systems at All Court Complexes in Telangana</li>
                <li>300 KW On-Grid Solar Systemat Birla Open Minds International School at Bibinagar.</li>
                <li> 200 KWGround Mounted High-Rise Structure, On-Grid Solar System at District Officers Complex, Khammam</li>
                <li>150 KW Ground Mounted, On-Grid Solar System at Buddhavanam Tourism at Nagarjuna Sagar, Nalgonda</li>
                <li>ZPHS Schools Medchal Districts 220 KW, Social Welfare Hostels in Telangana state</li>
                <li>280 KW And Home Principal Secretary House at MLA MP Colony 10 KW</li>
                <li>200 Kw Off-Grid Solar Systems at CM constituency at Erravalli Village</li>
                <li>We have installed so many home lighting systems. (ABOVE 4.5 MW)</li>
                <li>220 KW Rurban Works at Various Places in Telangana</li>
                <li>60KW On-Grid Solar System at Mahatma Gandhi University in Nalgonda</li>
                <li>81.5 KW On-Grid Solar System at Victoria memorial school at Saroor Nagar, Hyderabad</li>
                <li>59 KW On-Grid Solar System at Red Cross Society in Hyderabad</li>
                <li>19 KW On-Grid Solar System at Govt Women Degree College in Karimnagar</li>
                <li>15 KW On-Grid Solar System at Matsya Bhavan in Masab Tank, Hyderabad</li>

                <li>68 KW Power Plant at Fire Service Training Center Near Gachibowli Hyderabad</li>
                <li>60 KW Power Plant at BC Welfare Hostel West Marredpally Secunderabad.</li>
                <li> 60,000 liters solar water heating system installed at Dr.NTTPS, Vijayawada</li>
                <li>9500 Meters Solar Security Fence System at National Institute of Rural Development.</li>
                <li>Solar water heating systems installed at various Govt. Hospitals in Rangareddy Dist</li>
                <li>5 kw Solar Power generating Systems to 54 Petrol Bunks at Medak District through IOCL.</li>
                <li> More than 2 MW solar on grid power pack systems had been commissioned.</li>

            </ul>

          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}

export default AboutUs;
