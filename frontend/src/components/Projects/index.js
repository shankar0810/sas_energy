import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import TopBanner from "../TopBanner";
import Footer from "../Footer";
import "./index.css";

import Projects1 from "../../assets/projects-1.jpg";
import Projects2 from "../../assets/projects-2.jpg";
import Projects3 from "../../assets/projects-3.avif";
import Projects4 from "../../assets/projects-4.jpg";
import Projects5 from "../../assets/blog-2.jpg";
import Projects6 from "../../assets/blog-3.jpg";

const projects = [
  { id: 1, image: Projects1, title: "Team Collaboration", path: "/each-project" },
  { id: 2, image: Projects2, title: "Agriculture World Wide", path: "/each-project" },
  { id: 3, image: Projects3, title: "Solar Panel House", path: "/each-project" },
  { id: 4, image: Projects4, title: "Corporate Meeting", path: "/each-project" },
  { id: 5, image: Projects5, title: "Solar Energy Setup", path: "/each-project" },
  { id: 6, image: Projects6, title: "Business Presentation", path: "/each-project" },
];

function Projects() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
    <TopBanner />
      <Navbar />
      
      <div className="projects-container">
        <div className="projects-top-section">
          <h1 className="about-us-head">Projects</h1>
        </div>
        <div className="portfolio-container">
          <p className="portfolio-title">PORTFOLIO</p>
          <h2 className="portfolio-heading">Waste Is Avoided Through Conservation</h2>

       

          {/* Portfolio Grid */}
          <div className="portfolio-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="portfolio-item"
                onClick={() => handleNavigate(project.path)}
              >
                <img src={project.image} alt={project.title} className="portfolio-image" />
                <div className="portfolio-overlay">
                  <p className="project-label">New Project</p>
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Projects;
