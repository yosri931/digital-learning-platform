import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses();
  }, []);

  // =========================
  // 🎯 جلب الكورسات
  // =========================
  const getMyCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("enrollments/");

      const data = res.data.map((e) => e.course_detail);
      setCourses(data);

      // 🔥 بعد تحميل الكورسات → نجيب progress
      data.forEach(course => {
        getProgress(course.id);
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🎯 جلب نسبة التقدم من API
  // =========================
  const getProgress = async (courseId) => {
    try {
      const res = await api.get(
        `progress/course_progress/?course=${courseId}`
      );

      setProgress(prev => ({
        ...prev,
        [courseId]: res.data.progress
      }));

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // =========================
  // ▶ Continue Learning
  // =========================
  const continueLearning = (courseId) => {
    const lastLesson = localStorage.getItem("last_lesson");

    if (lastLesson) {
      navigate(`/lesson/${lastLesson}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <div style={{
      padding: "30px",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>
      
      <h1 style={{ marginBottom: "20px" }}>
        🎓 My Courses
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && courses.length === 0 && (
        <p>No enrolled courses</p>
      )}

      {/* 🔥 Courses Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        
        {courses.map((course) => {

          const courseProgress = progress[course.id] || 0;

          return (
            <div
              key={course.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "18px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
              }}
            >
              
              <h3 style={{ marginBottom: "10px" }}>
                📘 {course.title}
              </h3>

              <p style={{
                color: "#666",
                fontSize: "14px",
                minHeight: "40px"
              }}>
                {course.description}
              </p>

              {/* 🔥 Progress Bar حقيقي */}
              <div style={{ marginTop: "10px" }}>
                <div style={{
                  height: "6px",
                  background: "#eee",
                  borderRadius: "5px"
                }}>
                  <div style={{
                    width: `${courseProgress}%`,
                    height: "6px",
                    background: "#4f46e5",
                    borderRadius: "5px",
                    transition: "0.4s"
                  }} />
                </div>

                <small style={{ color: "#666" }}>
                  {courseProgress}% completed
                </small>
              </div>

              {/* 🔥 Continue Button */}
              <button
                onClick={() => continueLearning(course.id)}
                style={{
                  marginTop: "12px",
                  padding: "10px 14px",
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: "bold"
                }}
              >
                ▶ Continue Learning
              </button>

            </div>
          );
        })}

      </div>
    </div>
  );
}