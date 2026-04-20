import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await api.get("courses/");
      setCourses(res.data?.slice(0, 6) || []);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false); // 🔥 مهم جدًا
    }
  };

  return (
    <div style={{ fontFamily: "Arial" }}>

      {/* ================= HERO ================= */}
      <div style={{
        background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
        color: "#fff",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Learn Skills. Build Future. 🚀
        </h1>

        <p style={{ fontSize: "18px", opacity: 0.9 }}>
          Join thousands of students learning programming & tech skills
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          style={btnPrimary}
        >
          Start Learning
        </button>
      </div>

      {/* ================= FEATURES ================= */}
      <div style={featuresGrid}>
        <div style={cardStyle}>🎓 High Quality Courses</div>
        <div style={cardStyle}>⚡ Learn at Your Pace</div>
        <div style={cardStyle}>💼 Job Ready Skills</div>
      </div>

      {/* ================= COURSES ================= */}
      <div style={{ padding: "0 40px 60px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          🔥 Popular Courses
        </h2>

        {loading && <p>Loading courses...</p>}

        {!loading && courses.length === 0 && (
          <p>No courses available</p>
        )}

        <div style={coursesGrid}>
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              style={courseCard}
            >
              <h3>{course.title}</h3>

              <p style={descStyle}>
                {course.description}
              </p>

              <button style={btnCourse}>
                View Course
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div style={footerStyle}>
        © 2026 Digital Learning Platform
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const btnPrimary = {
  marginTop: "20px",
  padding: "12px 25px",
  background: "#fff",
  color: "#4f46e5",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};

const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "40px"
};

const coursesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  fontWeight: "bold"
};

const courseCard = {
  background: "#fff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.3s"
};

const descStyle = {
  color: "#666",
  fontSize: "14px",
  marginTop: "10px"
};

const btnCourse = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const footerStyle = {
  textAlign: "center",
  padding: "30px",
  background: "#111827",
  color: "#fff"
};