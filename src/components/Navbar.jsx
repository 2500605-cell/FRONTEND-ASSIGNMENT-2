
// Name: Adeena Akram
// Registration No: 2500605

import Button from "./Button";

function Navbar({ user, onNavigate, onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-icon">CP</span>
        <h2>CoursePortal</h2>
      </div>

      <div className="nav-links">
        <Button onClick={() => onNavigate("courses")}>
          Courses
        </Button>

        {user?.role === "student" && (
          <Button onClick={() => onNavigate("mycourses")}>
            My Courses
          </Button>
        )}

        {user?.role === "admin" && (
          <Button onClick={() => onNavigate("manage")}>
            Manage
          </Button>
        )}

        <span className="user-info">
          {user?.username} ({user?.role})
        </span>

        <Button className="logout-btn" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
