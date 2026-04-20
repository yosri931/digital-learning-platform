import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    try {
      // 🎯 course
      const courseRes = await api.get(`courses/${id}/`);
      setCourse(courseRes.data);

      // 🎯 lessons
      const lessonsRes = await api.get(`lessons/?course=${id}`);
      setLessons(lessonsRes.data);

      if (lessonsRes.data.length > 0) {
        setCurrentLesson(lessonsRes.data[0]);
      }

      // 🎯 progress
      getProgress();

      // 🎯 check enrollment (PROTECTION)
      const enrollRes = await api.get("enrollments/");
      const enrolled = enrollRes.data.some(
        (e) => e.course === parseInt(id)
      );
      setIsEnrolled(enrolled);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const getProgress = async () => {
    try {
      const res = await api.get(`progress/course_progress/?course=${id}`);
      setProgress(res.data.progress || 0);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const changeLesson = (lesson) => {
    setCurrentLesson(lesson);
  };

  // 💳 Buy course
  const buyCourse = async () => {
    try {
      const res = await api.post("payment/create-session/", {
        course: id,
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (!course) return <p style={{ padding: "30px" }}>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>

      {/* ================= SIDEBAR ================= */}
      <div style={{
        width: "300px",
        background: "#fff",
        padding: "20px",
        borderRight: "1px solid #eee"
      }}>
        <h3>{course.title}</h3>

        {/* Progress */}
        <div style={{ margin: "15px 0" }}>
          <div style={{
            height: "6px",
            background: "#eee",
            borderRadius: "5px"
          }}>
            <div style={{
              width: `${progress}%`,
              height: "6px",
              background: "#4f46e5",
              borderRadius: "5px"
            }} />
          </div>

          <small>{progress}% completed</small>
        </div>

        {/* Lessons */}
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              padding: "10px",
              marginBottom: "8px",
              cursor: "pointer",
              borderRadius: "8px",
              background: currentLesson?.id === lesson.id ? "#e0e7ff" : "#fff"
            }}
          >
            <div onClick={() => changeLesson(lesson)}>
              📘 {lesson.title}
            </div>

            <button
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              style={{
                marginTop: "5px",
                padding: "5px 8px",
                fontSize: "12px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Open Lesson
            </button>
          </div>
        ))}
      </div>

      {/* ================= MAIN ================= */}
      <div style={{ flex: 1, padding: "30px" }}>

        {/* 🔒 NOT ENROLLED */}
        {!isEnrolled ? (
          <div>
            <h2>🔒 You are not enrolled in this course</h2>

            <button
              onClick={buyCourse}
              style={{
                marginTop: "20px",
                padding: "10px 15px",
                background: "#ff5722",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Buy Course 💳
            </button>
          </div>
        ) : (
          <>
            {!currentLesson ? (
              <h2>اختر درس من القائمة 👈</h2>
            ) : (
              <>
                <h2>{currentLesson.title}</h2>

                {/* 🎬 VIDEO */}
                {currentLesson.video && (
                  <video
                    key={currentLesson.id}
                    width="100%"
                    height="400"
                    controls
                    style={{ borderRadius: "10px", marginTop: "15px" }}
                  >
                    <source
                      src={
                        typeof currentLesson.video === "string"
                          ? currentLesson.video.replace(/"/g, "")
                          : ""
                      }
                      type="video/mp4"
                    />
                  </video>
                )}

                {/* 📝 Content */}
                <p style={{ marginTop: "15px", color: "#555" }}>
                  {currentLesson.content}
                </p>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}