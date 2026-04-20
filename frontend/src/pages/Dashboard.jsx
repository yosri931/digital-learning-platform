import { useState, useEffect } from "react";
import { BookOpen, Home, Settings, LogOut, BarChart3 } from "lucide-react";
import api from "../api/axios";

export default function Dashboard() {
  const [active, setActive] = useState("home");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const menu = [
    { id: "home", label: "Home", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // =========================
  // GET COURSES
  // =========================
  const getCourses = async () => {
    try {
      const res = await api.get("/enrollments/my_courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (active === "courses") {
      getCourses();
    }
  }, [active]);

  // =========================
  // CREATE COURSE
  // =========================
  const createCourse = async () => {
    try {
      const res = await api.post("/courses/", {
        title: "New Course",
        description: "Test course",
        price: 100,
        is_published: false,
      });

      console.log(res.data);
      getCourses();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">

        <div className="p-6 text-xl font-bold text-blue-600">
          LearnHub SaaS
        </div>

        <nav className="flex-1 px-3 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setSelectedCourseId(null); // مهم جدًا يمنع loop
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm transition
                ${active === item.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6">

        {/* TOP */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome back 👋</h1>
          <p className="text-gray-500 text-sm">
            Keep learning and track your progress
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Enrolled Courses</p>
            <h2 className="text-2xl font-bold">{courses.length}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-2xl font-bold">1</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Progress</p>
            <h2 className="text-2xl font-bold">42%</h2>
          </div>

        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          {/* HOME */}
          {active === "home" && (
            <p className="text-gray-500">
              Select a course to start learning
            </p>
          )}

          {/* COURSES */}
          {active === "courses" && (
            <div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">My Courses</h2>

                <button
                  onClick={createCourse}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  ➕ Create Course
                </button>
              </div>

              {courses.length === 0 ? (
                <p className="text-gray-500">No enrolled courses</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="font-bold text-lg">
                        {course.course_title}
                      </h3>

                      <p className="text-gray-500 text-sm mt-2">
                        {course.course_detail?.description}
                      </p>

                      <div className="mt-3 text-sm text-gray-600">
                        💰 {course.course_price} EGP
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setActive("home"); // انتقال بسيط بدون render loop
                        }}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
                      >
                        Continue Learning
                      </button>
                    </div>
                  ))}

                </div>
              )}
            </div>
          )}

          {/* PROGRESS */}
          {active === "progress" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Progress Overview</h2>
              <p className="text-gray-500">Charts coming next step</p>
            </div>
          )}

          {/* SETTINGS */}
          {active === "settings" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Settings</h2>
              <p className="text-gray-500">Profile settings here</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}