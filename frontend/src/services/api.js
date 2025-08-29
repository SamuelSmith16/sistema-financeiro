import axios from "axios";

// URL base vinda da variável de ambiente VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;