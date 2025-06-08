// utils/auth.js
// Updated to handle multiple microservices with admin checks for gallery

const API_BASE_URL = 'http://localhost:3333/api/v1'; // User service
const GALLERY_API_BASE_URL = 'http://localhost:3335/api/v3'; // Gallery service

// Token management
export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getUserRole = () => localStorage.getItem('userRole');
export const getUserEmail = () => localStorage.getItem('userEmail');
export const getUserName = () => localStorage.getItem('userName');

export const isAuthenticated = () => !!getAccessToken();
export const isAdmin = () => getUserRole() === 'ROLE_ADMIN';

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  window.location.href = '/login';
};

// Base API call with token refresh
const baseApiCall = async (baseUrl, url, options = {}) => {
  let accessToken = getAccessToken();
  
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const isFormData = options.body instanceof FormData;
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...options.headers
    }
  };

  let response = await fetch(`${baseUrl}${url}`, {
    ...options,
    ...defaultOptions
  });

  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    if (accessToken) {
      defaultOptions.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(`${baseUrl}${url}`, {
        ...options,
        ...defaultOptions
      });
    } else {
      throw new Error('Authentication failed');
    }
  }

  return response;
};

// User service API calls
export const apiCall = (url, options) => baseApiCall(API_BASE_URL, url, options);

// Gallery service API calls
export const galleryApiCall = (url, options) => baseApiCall(GALLERY_API_BASE_URL, url, options);

// Gallery-specific functions with proper authorization checks
export const uploadGalleryImage = async (formData) => {
  if (!isAdmin()) {
    throw new Error('Unauthorized: Admin privileges required');
  }
  return await galleryApiCall('/gallery/upload', {
    method: 'POST',
    body: formData
  });
};

// Public access - no admin check needed
export const getAllGalleryImages = async () => {
  return await galleryApiCall('/gallery/getall', {
    method: 'GET'
  });
};

// Public access - no admin check needed
export const getGalleryImageById = async (id) => {
  return await galleryApiCall(`/gallery/${id}`, {
    method: 'GET'
  });
};

export const deleteGalleryImage = async (id) => {
  if (!isAdmin()) {
    throw new Error('Unauthorized: Admin privileges required');
  }
  return await galleryApiCall(`/gallery/${id}`, {
    method: 'DELETE'
  });
};

// Token refresh function
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    logout();
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      return data.data.accessToken;
    } else {
      logout();
      return null;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout();
    return null;
  }
};

// Email verification function
export const verifyEmail = async (token, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response;
  } catch (error) {
    console.error('Email verification failed:', error);
    throw error;
  }
};

// Reset password function
export const resetPassword = async (email, token, newPassword, confirmPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        token,
        newPassword,
        confirmPassword
      })
    });

    return response;
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
};