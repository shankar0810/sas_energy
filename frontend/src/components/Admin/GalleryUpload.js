import React, { useState } from 'react';
import { galleryApiCall } from '../utils/auth'; // Changed from apiCall to galleryApiCall

const GalleryUpload = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        file: file
      }));
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.file) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description || '');
      uploadData.append('file', formData.file);

      const response = await galleryApiCall('/gallery/upload', { // Changed to galleryApiCall
        method: 'POST',
        body: uploadData
        // No Content-Type header needed for FormData
      });

      if (response.ok) {
        const result = await response.json();
        alert('Image uploaded successfully!');
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          file: null
        });
        setPreview(null);
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
        // Callback to refresh gallery
        if (onUploadSuccess) {
          onUploadSuccess(result.data);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error.message === 'Unauthorized: Admin privileges required') {
        setError('You need admin privileges to upload images');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      file: null
    });
    setPreview(null);
    setError(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="gallery-upload-container">
      <div className="upload-form-card">
        <h3>Upload New Image</h3>
        
        {error && (
          <div className="error-message" style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        
        <div className="upload-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter image title"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                marginTop: '5px'
              }}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter image description (optional)"
              rows="3"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                marginTop: '5px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div className="form-group">
            <label>Image File *</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
                marginTop: '5px'
              }}
            />
            <small style={{ display: 'block', marginTop: '5px', color: '#666', fontSize: '12px' }}>
              Supported formats: JPG, PNG, GIF. Max size: 10MB
            </small>
          </div>

          {preview && (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '10px', color: '#333' }}>Preview:</h4>
              <img 
                src={preview} 
                alt="Preview" 
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          )}

          <div className="form-actions">
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                marginRight: '15px'
              }}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
            
            <button
              onClick={handleReset}
              disabled={loading}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s',
                opacity: loading ? 0.6 : 1
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gallery-upload-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
        }

        .upload-form-card {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .upload-form-card h3 {
          margin-bottom: 25px;
          color: #333;
          font-size: 24px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 25px;
        }

        @media (max-width: 768px) {
          .gallery-upload-container {
            padding: 10px;
          }
          
          .upload-form-card {
            padding: 20px;
          }
          
          .form-actions {
            flex-direction: column;
            gap: 10px;
          }
          
          .form-actions button {
            width: 100% !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryUpload;