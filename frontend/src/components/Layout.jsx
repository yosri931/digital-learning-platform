import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // مهم: reset كامل للتطبيق
    window.location.href = "/";
  };

  const menu = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "My Courses", path: "/my-courses", icon: "📘" },
    { name: "Settings", path: "/instructor", icon: "⚙️" },
  ];

  return (
    <div style={styles.wrapper}>

      <aside style={styles.sidebar}>

        <div style={styles.logo}>📚 LearnHub</div>

        <div style={styles.menu}>
          {menu.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.item,
                background:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>

        <div style={styles.logout} onClick={logout}>
          🚪 Logout
        </div>

      </aside>

      <main style={styles.main}>

        <div style={styles.topbar}>
          <h2>Welcome 👋</h2>
          <p>Keep learning and build your future</p>
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>

      </main>

    </div>
  );
}

const styles = {
  wrapper: { display: "flex", height: "100vh", background: "#f4f6fa" },
  sidebar: { width: "260px", background: "#11121c", color: "#fff", padding: "20px" },
  logo: { fontSize: "22px", fontWeight: "bold", marginBottom: "30px" },
  menu: { display: "flex", flexDirection: "column", gap: "10px" },
  item: { padding: "12px", borderRadius: "10px", cursor: "pointer" },
  logout: { marginTop: "20px", color: "red", cursor: "pointer" },
  main: { flex: 1, padding: "25px" },
  topbar: { marginBottom: "20px" },
  content: { background: "#fff", padding: "20px", borderRadius: "10px" }
};