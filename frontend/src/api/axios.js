import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// =========================
// REQUEST
// =========================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// RESPONSE (IMPORTANT FIX)
// =========================
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // ❌ DON'T AUTO LOGOUT (THIS WAS YOUR BUG)
    console.log("API Error:", err.response?.status);

    return Promise.reject(err);
  }
);

export default api;