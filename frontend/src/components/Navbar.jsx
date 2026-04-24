import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/", { replace: true });
  };

  return (
    <div>

      {/* Test Tailwind */}
      <h1 className="text-3xl text-red-500 font-bold mb-4">
        Tailwind is Working 🚀
      </h1>

      {/* Navbar */}
      <div
        style={{
          padding: "10px",
          background: "#eee",
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/my-courses")}>My Courses</button>

        <button onClick={handleLogout}>Logout</button>
      </div>

    </div>
  );
}