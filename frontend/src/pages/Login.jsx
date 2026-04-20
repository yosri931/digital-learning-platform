import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // ✅ تم تصحيح المسار (بدون /api/ هنا)
      const res = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // الأفضل بدل reload كامل
      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">

      {/* BOX */}
      <div className="w-[380px] bg-white rounded-2xl shadow-xl p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-1">
          LearnHub
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back 👋
        </p>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}