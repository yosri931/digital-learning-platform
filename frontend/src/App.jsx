import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import CoursePlayer from "./pages/CoursePlayer";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  const token = localStorage.getItem("access");

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/login"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/course-player/:id" element={<CoursePlayer />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
      </Route>

    </Routes>
  );
}

export default App;