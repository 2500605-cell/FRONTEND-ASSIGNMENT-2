
 // Name: Adeena Akram
 // Registration No: 2500605

import { useContext, useMemo, useCallback } from "react";

import { CourseContext } from "../context/CourseContext";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

function MyCoursesPage() {
  const {
    courses,
    enrolments,
    dropCourse
  } = useContext(CourseContext);

  const { user } = useContext(AuthContext);

  useDocumentTitle("My Courses | CoursePortal");

  const enrolledIds = enrolments[user.username] || [];

  const myCourses = useMemo(() => {
    return courses.filter(
      (course) => enrolledIds.includes(course.id)
    );
  }, [courses, enrolledIds]);

  const totalCredits = useMemo(() => {
    return myCourses.reduce(
      (total, course) => total + course.credits,
      0
    );
  }, [myCourses]);

  const handleDrop = useCallback((courseId) => {
    dropCourse(user.username, courseId);
  }, [dropCourse, user]);

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR ACADEMIC SPACE</span>
          <h1>My Courses</h1>
          <p>Manage your current semester enrolments.</p>
        </div>

        <div className="stat-box">
          <strong>{totalCredits}/18</strong>
          <span>Total Credits</span>
        </div>
      </div>

      <div className="summary-row">
        <div className="summary-card">
          <span>Enrolled Courses</span>
          <strong>{myCourses.length}</strong>
        </div>

        <div className="summary-card">
          <span>Remaining Credits</span>
          <strong>{18 - totalCredits}</strong>
        </div>
      </div>

      <div className="course-grid">
        {myCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {myCourses.length === 0 && (
        <div className="empty-state">
          <h2>No courses enrolled yet</h2>
          <p>Visit the Courses page to enrol in your first course.</p>
        </div>
      )}
    </div>
  );
}

export default MyCoursesPage;
