import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [lesson, setLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);

  useEffect(() => {
    getLesson();
  }, [id]);

  const getLesson = async () => {
    try {
      const res = await api.get(`lessons/${id}/`);
      setLesson(res.data);

      const list = await api.get(`lessons/?course=${res.data.course}`);

      const currentIndex = list.data.findIndex(l => l.id == id);

      if (currentIndex !== -1 && currentIndex < list.data.length - 1) {
        setNextLesson(list.data[currentIndex + 1]);
      } else {
        setNextLesson(null);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🎯 Save progress (Resume)
  // =========================
  const saveTime = () => {
    if (videoRef.current) {
      localStorage.setItem(
        `lesson-${id}-time`,
        videoRef.current.currentTime
      );
    }
  };

  // =========================
  // 🎯 Load saved time
  // =========================
  const loadTime = () => {
    const saved = localStorage.getItem(`lesson-${id}-time`);
    if (saved && videoRef.current) {
      videoRef.current.currentTime = Number(saved);
    }
  };

  // =========================
  // 🎯 Auto next lesson
  // =========================
  const handleEnd = () => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    }
  };

  if (!lesson) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>

      <h2>{lesson.title}</h2>

      {/* 🎬 VIDEO */}
      {lesson.video && (
        <video
          ref={videoRef}
          width="100%"
          height="450"
          controls
          onTimeUpdate={saveTime}
          onLoadedMetadata={loadTime}
          onEnded={handleEnd}
          style={{ borderRadius: "10px" }}
        >
          <source
            src={lesson.video?.replace(/"/g, "")}
            type="video/mp4"
          />
        </video>
      )}

      <p style={{ marginTop: "15px" }}>
        {lesson.content}
      </p>

      {/* 👉 Next Lesson Button */}
      {nextLesson && (
        <button
          onClick={() => navigate(`/lesson/${nextLesson.id}`)}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Next Lesson →
        </button>
      )}

    </div>
  );
}