import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { title: "Courses", value: "2", icon: "📚" },
  { title: "Enrolled", value: "2", icon: "🎓" },
  { title: "Progress", value: "0%", icon: "📊" },
];

const data = [
  { name: "Completed", value: 30 },
  { name: "Remaining", value: 70 },
];

const COLORS = ["#3b82f6", "#374151"]; // dark-friendly

export default function Dashboard() {
  const [notif] = useState(false);

  const progress = Math.round(
    (data[0].value / (data[0].value + data[1].value)) * 100
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back 👋 Manage your learning progress
        </p>
      </div>

      {/* NOTIFICATION */}
      {notif && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 p-3 rounded-xl">
          🔔 New update available!
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-700 rounded-2xl p-6
            shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            <div className="text-2xl">{s.icon}</div>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {s.title}
            </p>

            <h3 className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
              {s.value}
            </h3>

          </motion.div>
        ))}

      </div>

      {/* 📊 PROGRESS (UPDATED) */}
      <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">

        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          📊 Progress Overview
        </h2>

        <div className="h-[260px] relative flex items-center justify-center">

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                stroke="none"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute text-center">
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {progress}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </p>
          </div>

        </div>

      </div>

      {/* 📚 COURSES */}
      <div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Your Courses
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {["HTML", "JavaScript"].map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-700 rounded-2xl p-5
              shadow-sm hover:shadow-xl transition-all duration-300"
            >

              <h3 className="font-semibold text-gray-800 dark:text-white">
                {course}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Learn {course} from beginner to advanced level
              </p>

              <button className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Continue →
              </button>

            </motion.div>
          ))}

        </div>

      </div>

      {/* 🎯 PLAYER */}
      <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">

        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          🎯 Course Player
        </h2>

        <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
          Video Player UI (Ready for upgrade)
        </div>

      </div>

    </div>
  );
}