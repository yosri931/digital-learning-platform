import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ✅ تطبيق + حفظ الثيم
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const menu = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "My Courses", path: "/my-courses", icon: "📘" },
    { name: "Settings", path: "/instructor", icon: "⚙️" },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-[#f6f7fb] dark:bg-[#0b1220] text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1220] text-white flex flex-col p-5">

        <h1 className="text-2xl font-bold mb-8 tracking-wide">
          📚 LearnHub
        </h1>

        <div className="flex flex-col gap-2 flex-1">

          {menu.map((item, i) => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
              ${
                location.pathname === item.path
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </motion.button>
          ))}

        </div>

        {/* Bottom */}
        <div className="space-y-3">

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-xl transition"
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl transition font-medium"
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome back 👋
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your courses and track your progress
          </p>

        </motion.div>

        {/* 🔥 مهم: wrapper عام يطبق dark text */}
        <div className="text-gray-800 dark:text-gray-200">
          <Outlet />
        </div>

      </main>

    </div>
  );
}