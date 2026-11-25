
 // Name: Adeena Akram
 // Registration No: 2500605

import { useContext, useCallback } from "react";

import { CourseContext } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ManagePage() {
  const {
    courses,
    addCourse,
    deleteCourse
  } = useContext(CourseContext);

  useDocumentTitle("Manage Courses | CoursePortal");

  const handleAdd = useCallback((course) => {
    addCourse(course);
  }, [addCourse]);

  const handleDelete = useCallback((id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {
      deleteCourse(id);
    }
  }, [deleteCourse]);

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMINISTRATION</span>
          <h1>Manage Courses</h1>
          <p>Add new courses or manage existing courses.</p>
        </div>

        <div className="stat-box">
          <strong>{courses.length}</strong>
          <span>Total Courses</span>
        </div>
      </div>

      <CourseForm onAdd={handleAdd} />

      <h2 className="section-title">Existing Courses</h2>

      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ManagePage;
