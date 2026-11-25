
// Name: Adeena Akram
// Registration No: 2500605

import { memo } from "react";
import Card from "./Card";
import Button from "./Button";

function CourseCard({
  course,
  onEnrol,
  onDelete,
  onDrop,
  enrolled
}) {
  return (
    <Card className="course-card">
      <div className="course-top">
        <span className="course-code">{course.code}</span>
        <span className="credits">{course.credits} Credits</span>
      </div>

      <h3>{course.title}</h3>

      <p>
        <strong>Instructor:</strong> {course.instructor.name}
      </p>

      <p>
        <strong>Email:</strong> {course.instructor.email}
      </p>

      {onEnrol && (
        <Button
          onClick={() => onEnrol(course.id)}
          disabled={enrolled}
        >
          {enrolled ? "Already Enrolled" : "Enrol Now"}
        </Button>
      )}

      {onDrop && (
        <Button className="danger-btn" onClick={() => onDrop(course.id)}>
          Drop Course
        </Button>
      )}

      {onDelete && (
        <Button className="danger-btn" onClick={() => onDelete(course.id)}>
          Delete Course
        </Button>
      )}
    </Card>
  );
}

export default memo(CourseCard);
