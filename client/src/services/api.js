import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // 🔥 VERY IMPORTANT
});

export default API;
