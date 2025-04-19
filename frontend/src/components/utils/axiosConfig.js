import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;