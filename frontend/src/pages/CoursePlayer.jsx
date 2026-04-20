import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function CoursePlayer() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    getLessons();
  }, []);

  const getLessons = async () => {
    try {
      const [lessonsRes, progressRes] = await Promise.all([
        api.get(`/lessons/?course=${id}`),
        api.get(`/progress/?course=${id}`),
      ]);

      const lessonsData = lessonsRes.data;
      const progressData = progressRes.data;

      setLessons(lessonsData);
      setProgress(progressData);

      const savedLessonId = localStorage.getItem(`course_${id}`);

      if (lessonsData.length > 0) {
        const savedLesson = lessonsData.find(
          (l) => l.id === Number(savedLessonId)
        );

        setSelectedLesson(savedLesson || lessonsData[0]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const goNext = () => {
    const index = lessons.findIndex(l => l.id === selectedLesson.id);

    if (index < lessons.length - 1) {
      const nextLesson = lessons[index + 1];
      setSelectedLesson(nextLesson);
      localStorage.setItem(`course_${id}`, nextLesson.id);
    }
  };

  const goPrev = () => {
    const index = lessons.findIndex(l => l.id === selectedLesson.id);

    if (index > 0) {
      const prevLesson = lessons[index - 1];
      setSelectedLesson(prevLesson);
      localStorage.setItem(`course_${id}`, prevLesson.id);
    }
  };

  const isCompleted = (lessonId) => {
    return progress.some(
      (p) => p.lesson === lessonId && p.is_completed
    );
  };

  const markCompleted = async () => {
    try {
      await api.post("/progress/", {
        course: id,
        lesson: selectedLesson.id,
        is_completed: true,
      });

      setProgress((prev) => {
        const exists = prev.find(
          (p) => p.lesson === selectedLesson.id
        );

        if (exists) return prev;

        return [
          ...prev,
          { lesson: selectedLesson.id, is_completed: true },
        ];
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-lg font-bold mb-4">📚 Course Content</h2>

        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => {
                setSelectedLesson(lesson);
                localStorage.setItem(`course_${id}`, lesson.id);
              }}
              className={`p-2 rounded cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                selectedLesson?.id === lesson.id ? "bg-blue-100" : ""
              }`}
            >
              <span>📘 {lesson.title}</span>

              {isCompleted(lesson.id) && (
                <span className="text-green-600 font-bold">✔</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main */}
      <div className="w-3/4 p-6">

        {/* Video */}
        <div className="bg-black h-96 rounded-lg overflow-hidden">
          {selectedLesson?.video_url ? (
            <iframe
              className="w-full h-full"
              src={selectedLesson.video_url}
              title="Lesson Video"
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              🎥 No video for this lesson
            </div>
          )}
        </div>

        {/* Info */}
        <h1 className="text-2xl font-bold mt-4">
          {selectedLesson?.title || "Select a lesson"}
        </h1>

        <p className="text-gray-600 mt-2">
          {selectedLesson?.content || ""}
        </p>

        {/* Actions */}
        <button
          onClick={markCompleted}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
        >
          ✔ Mark as Completed
        </button>

        {/* Navigation */}
        <div className="flex justify-between mt-6">

          <button
            onClick={goPrev}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            ◀ Previous
          </button>

          <button
            onClick={goNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next ▶
          </button>

        </div>

      </div>
    </div>
  );
}