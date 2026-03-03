import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://omniagent-ai.onrender.com/api",
  withCredentials: true // 🔥 VERY IMPORTANT

});

export const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://omniagent-ai.onrender.com/api",

  withCredentials: true // 🔥 VERY IMPORTANT
});

// DocuMind AI api integration

export const BOT = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://rag-bot-back.onrender.com/api",
  withCredentials: true, // ✅ cookie send karega
});


export default API;
