import { useState, useEffect } from "react";
import api from "../api/axios";

export default function LessonPlayer({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  // =========================
  // 📚 GET LESSONS
  // =========================
  const getLessons = async () => {
    try {
      const res = await api.get(`/lessons/?course=${courseId}`);
      setLessons(res.data);

      // فتح أول درس بشكل آمن
      if (res.data && res.data.length > 0) {
        setCurrentLesson(null); // مهم يمنع flicker
        openLesson(res.data[0].id);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🎬 OPEN LESSON
  // =========================
  const openLesson = async (id) => {
    try {
      const res = await api.get(`/lessons/${id}/play/`);
      setCurrentLesson(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🔁 LOAD WHEN COURSE CHANGES
  // =========================
  useEffect(() => {
    if (!courseId) return;

    setLessons([]);
    setCurrentLesson(null);

    getLessons();
  }, [courseId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* 📚 Lessons List */}
      <div className="md:col-span-1 border rounded-xl p-3 bg-white">
        <h2 className="font-bold mb-3">Lessons</h2>

        <div className="space-y-2">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => openLesson(lesson.id)}
              className="w-full text-left p-2 border rounded hover:bg-gray-50"
            >
              {lesson.title}
            </button>
          ))}
        </div>
      </div>

      {/* 🎬 Player */}
      <div className="md:col-span-3 border rounded-xl p-4 bg-white">

        {!currentLesson ? (
          <p className="text-gray-500">Select a lesson</p>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-3">
              {currentLesson.title}
            </h1>

            {currentLesson.video_url && (
              <video
                controls
                className="w-full rounded mb-4"
                src={currentLesson.video_url}
              />
            )}

            <p className="text-gray-700 whitespace-pre-line">
              {currentLesson.content}
            </p>
          </>
        )}

      </div>

    </div>
  );
}