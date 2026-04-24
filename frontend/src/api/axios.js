import axios from "axios";

// =========================
// AXIOS INSTANCE
// =========================
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// =========================
// REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.status);
    console.log("API Error Data:", error.response?.data);

    // مهم: لا تقم بعمل logout تلقائي (كما كان يحدث في بعض المشاريع)
    return Promise.reject(error);
  }
);

export default api;