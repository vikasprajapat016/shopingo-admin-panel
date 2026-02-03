

import axios from "axios";

const api = axios.create({
  baseURL: "https://shopingo-backend.onrender.com" || "http://localhost:5000/api",
  withCredentials: true,  // ✅ crucial
});

export default api;
