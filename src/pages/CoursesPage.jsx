
 // Name: Adeena Akram
 // Registration No: 2500605

import {
  useContext,
  useState,
  useMemo,
  useCallback
} from "react";

import { CourseContext } from "../context/CourseContext";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

function CoursesPage() {
  const {
    courses,
    enrolments,
    enrolCourse,
    loading,
    error
  } = useContext(CourseContext);

  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [creditFilter, setCreditFilter] = useState("all");
  const [message, setMessage] = useState("");

  useDocumentTitle("Courses | CoursePortal");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase());

      const matchesCredits =
        creditFilter === "all" ||
        course.credits === Number(creditFilter);

      return matchesSearch && matchesCredits;
    });
  }, [courses, search, creditFilter]);

  const handleEnrol = useCallback((courseId) => {
    const result = enrolCourse(user.username, courseId);
    setMessage(result);
  }, [enrolCourse, user]);

  const enrolledCourses = enrolments[user.username] || [];

  if (loading) {
    return <h2 className="status-message">Loading courses...</h2>;
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACADEMIC CATALOGUE</span>
          <h1>Explore Courses</h1>
          <p>Discover courses and build your semester schedule.</p>
        </div>

        <div className="stat-box">
          <strong>{courses.length}</strong>
          <span>Available Courses</span>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={creditFilter}
          onChange={(e) => setCreditFilter(e.target.value)}
        >
          <option value="all">All Credits</option>
          <option value="1">1 Credit</option>
          <option value="2">2 Credits</option>
          <option value="3">3 Credits</option>
          <option value="4">4 Credits</option>
        </select>
      </div>

      {message && (
        <div className={
          message.includes("Successfully") ? "success-message" : "error-message"
        }>
          {message}
        </div>
      )}

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnrol={user.role === "student" ? handleEnrol : null}
            enrolled={enrolledCourses.includes(course.id)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="empty-message">No matching courses found.</p>
      )}
    </div>
  );
}

export default CoursesPage;
