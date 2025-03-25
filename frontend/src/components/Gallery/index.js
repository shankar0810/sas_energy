import React from "react";
import "./index.css";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Img from "../../assets/picture8.jpg";
const images = [Img, Img, Img, Img, Img, Img, Img];

function Gallery() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="gallery-container">
        <div className="gallery-top-section">
          <h1 className="about-us-head">Gallery</h1>
        </div>
        <div className="gallery-bottom-section">
          {images.map((image) => (
            <img src={image} alt="gallery" className="gallary-image" />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
