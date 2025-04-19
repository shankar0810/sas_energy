import axios from "axios";

const API_URL = "http://localhost:3333/api/v1";

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userEmail", email);
      }
      return response.data;
    });
};

const register = (name, email, password) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    roles: "ROLE_ADMIN",
    status: "PENDING"
  });
};

const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot-password`, null, { params: { email } });
};

const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
};

export default {
  login,
  register,
  forgotPassword,
  logout
};