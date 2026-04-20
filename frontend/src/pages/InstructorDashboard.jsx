import { useEffect, useState } from "react";
import api from "../api/axios";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getMyCourses();
  }, []);

  // =========================
  // 🎯 جلب كورسات المدرس
  // =========================
  const getMyCourses = async () => {
    try {
      const res = await api.get("courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // =========================
  // 🎯 إنشاء كورس جديد
  // =========================
  const createCourse = async () => {
    if (!title || !description) return;

    try {
      await api.post("courses/", {
        title,
        description,
        is_published: true
      });

      setTitle("");
      setDescription("");
      getMyCourses();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f5f6fa", minHeight: "100vh" }}>

      <h1>🎓 Instructor Dashboard</h1>

      {/* ================= CREATE COURSE ================= */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px"
      }}>
        <h3>Create New Course</h3>

        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <button
          onClick={createCourse}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ➕ Create Course
        </button>
      </div>

      {/* ================= MY COURSES ================= */}
      <h2 style={{ marginTop: "30px" }}>My Courses</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>

        {courses.map((course) => (
          <div key={course.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>

            <h3>{course.title}</h3>
            <p style={{ color: "#666" }}>{course.description}</p>

            <button
              onClick={() => alert("Add lessons page next")}
              style={{
                marginTop: "10px",
                padding: "8px",
                width: "100%",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "8px"
              }}
            >
              ➕ Add Lessons
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}