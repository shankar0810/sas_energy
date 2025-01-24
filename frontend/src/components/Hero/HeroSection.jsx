import React from 'react';
import './HeroSection.css';
import Carousel from 'react-slick'; // Ensure react-slick and slick-carousel are installed
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import solar1 from '../../assets/solar1.jpg';
import solar2 from '../../assets/solar2.jpg';
import solar3 from '../../assets/solar3.jpg';

function HeroSection() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false, // Optional: Hide navigation arrows for a cleaner look
  };

  return (
    <section className="hero-container w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-gray-100 to-white">
      {/* Info Section */}
      <div className="hero-info w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-4xl text-gray-900 mb-6 leading-relaxed">
          Powering <span className="text-green-600">Sustainable Energy</span> for the Future
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
          Explore innovative solar solutions with Sri Associates. Together, let's create a greener, brighter tomorrow with cutting-edge technology.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-green-700 transition duration-300">
          Learn More
        </button>
      </div>

      {/* Circular Carousel Section */}
      <div className="hero-carousel w-full lg:w-1/2 flex items-center justify-center">
        <div className="carousel-wrapper relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden rounded-full shadow-lg">
          <Carousel {...carouselSettings}>
            <div className="carousel-slide">
              <img
                src={solar1}
                alt="Solar Panel Installation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img
                src={solar2}
                alt="Green Energy Project"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img
                src={solar3}
                alt="Efficient Solar Solutions"
                className="w-full h-full object-cover"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
