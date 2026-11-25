
 // Name: Adeena Akram
 // Registration No: 2500605

import { useState, useContext, useEffect } from "react";

import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursesPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import ManagePage from "./pages/ManagePage";

function App() {
  const { user, logout } = useContext(AuthContext);

  const [page, setPage] = useState("courses");

  useEffect(() => {
    if (!user) {
      setPage("courses");
    } else {
      setPage("courses");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    setPage("courses");
  };

  if (!user) {
    return (
      <LoginPage
        onLoginSuccess={() => setPage("courses")}
      />
    );
  }

  return (
    <div className="app">
      <Navbar
        user={user}
        onNavigate={setPage}
        onLogout={handleLogout}
      />

      <main>
        {page === "courses" && <CoursesPage />}

        {page === "mycourses" && user.role === "student" && (
          <MyCoursesPage />
        )}

        {page === "manage" && user.role === "admin" && (
          <ManagePage />
        )}
      </main>

      <footer>
        <p>Student Course Portal | Air University</p>
        <p>CS-301L | Full Stack Web Development Lab</p>
      </footer>
    </div>
  );
}

export default App;
