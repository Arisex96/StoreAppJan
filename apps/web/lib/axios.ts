import axios from "axios";

const apiUrl = process.env.BACKEND_PUBLIC_URL || "http://localhost:4000";
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // VERY IMPORTANT for auth cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
