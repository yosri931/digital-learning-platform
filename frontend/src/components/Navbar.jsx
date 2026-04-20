import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/", { replace: true });
  };

  return (
    <div style={{ padding: "10px", background: "#eee", display: "flex", gap: "10px" }}>
      
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/my-courses")}>My Courses</button>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}