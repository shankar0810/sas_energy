import React, { useState, useEffect } from "react";
import "./index.css";
import TopBanner from "../TopBanner";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
  try {
    setLoading(true);
    setError('');
    
    const response = await fetch('http://localhost:3335/api/v3/gallery/getall', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        setImages(result.data);
      } else {
        setError('No images found');
      }
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to fetch images');
    }
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    setError('Network error. Please try again later.');
  } finally {
    setLoading(false);
  }
};

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'flex';
    }
  };

  const handleImageLoad = (e) => {
    e.target.style.opacity = '1';
  };

  return (
    <>
      <TopBanner />
      <Navbar />
      <div className="gallery-container">
        <div className="gallery-top-section">
          <h1 className="about-us-head">Gallery</h1>
          <p style={{ 
            color: 'white', 
            fontSize: '18px', 
            marginTop: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Explore our solar energy projects and installations
          </p>
        </div>
        
        <div className="gallery-bottom-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading gallery images...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-message">
                <h3>Unable to load images</h3>
                <p>{error}</p>
                <button 
                  onClick={fetchGalleryImages}
                  className="retry-btn"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="no-images-container">
              <div className="no-images-message">
                <h3>No Images Available</h3>
                <p>Gallery is currently empty. Images will appear here once uploaded.</p>
              </div>
            </div>
          ) : (
            <div className="gallery-grid">
              {images.map((image, index) => (
                <div key={image.id || index} className="gallery-image-container">
                  <div className="image-wrapper">
                    <img 
                      src={image.imageUrl} 
                      alt={image.title || 'Gallery image'} 
                      className="gallery-image"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                    />
                    <div className="image-error-placeholder" style={{ display: 'none' }}>
                      <div className="error-icon">📷</div>
                      <p>Image not available</p>
                    </div>
                  </div>
                  
                  <div className="image-overlay">
                    <div className="image-info">
                      <h4>{image.title}</h4>
                      {image.description && (
                        <p className="image-description">{image.description}</p>
                      )}
                      <div className="image-meta">
                        {image.createdAt && (
                          <span className="upload-date">{formatDate(image.createdAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {images.length > 0 && (
          <div className="gallery-stats">
            <p>Total Images: <strong>{images.length}</strong></p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Gallery;