import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css"; // Create a separate CSS file for styling

const testimonials = [
  {
    name: "Willum Kari",
    title: "Founder",
    text: "Ecology is crucial for our understanding of the natural world have led to a decline in biodiversity and negative impacts on ecosystems.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4,
  },
  {
    name: "David Maven",
    title: "Founder",
    text: "Ecology is crucial for our understanding of the natural world have led to a decline in biodiversity and negative impacts on ecosystems.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Function to generate stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="testimonial-container">
        
        <h3 className="testimonial-heading">CLIENTS TALK</h3>
     
   
      <h2 className="testimonial-subheading">
        Solar-Friendly Products  For A Healthier Planet
      </h2>
      <Slider {...settings} ref={sliderRef}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-left-content">
              <div className="testimonial-img-container">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-img"
                />
              </div>
              <div className="testimonial-text-cont">
                <h4 className="head-24">{testimonial.name}</h4>
                <p className="testimonial-title">{testimonial.title}</p>
              </div>
            </div>
            <div className="testimonial-right-content">
              <div className="rating-cont">{renderStars(testimonial.rating)}</div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="env-arrows-cont">
        <button
          className="left-arrow-box"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <div className="left-arrow"></div>
        </button>
        <button
          className="right-arrow-box"
          onClick={() => sliderRef.current.slickNext()}
        >
          <div className="right-arrow"></div>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
