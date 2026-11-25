
 // Name: Adeena Akram
 // Registration No: 2500605

import { useState, useRef } from "react";
import Button from "./Button";

function CourseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    code: "",
    credits: "",
    instructorName: "",
    instructorEmail: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const titleRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Course title is required.";
    }

    if (!/^CS-\d{3}$/i.test(form.code.trim())) {
      newErrors.code = "Code must be like CS-301.";
    }

    const credits = Number(form.credits);

    if (!Number.isInteger(credits) || credits < 1 || credits > 4) {
      newErrors.credits = "Credits must be between 1 and 4.";
    }

    if (!form.instructorName.trim()) {
      newErrors.instructorName = "Instructor name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.instructorEmail)) {
      newErrors.instructorEmail = "Enter a valid email address.";
    }

    setErrors(newErrors);
    setMessage("");

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: form.title.trim(),
      code: form.code.trim().toUpperCase(),
      credits,
      instructor: {
        name: form.instructorName.trim(),
        email: form.instructorEmail.trim()
      }
    };

    onAdd(newCourse);

    setForm({
      title: "",
      code: "",
      credits: "",
      instructorName: "",
      instructorEmail: ""
    });

    setErrors({});
    setMessage("Course added successfully!");

    titleRef.current.focus();
  };

  return (
    <div className="form-card">
      <h2>Add New Course</h2>

      <form onSubmit={handleSubmit}>
        <label>Course Title</label>
        <input
          ref={titleRef}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter course title"
        />
        {errors.title && <p className="field-error">{errors.title}</p>}

        <label>Course Code</label>
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Example: CS-301"
        />
        {errors.code && <p className="field-error">{errors.code}</p>}

        <label>Credits</label>
        <input
          name="credits"
          type="number"
          min="1"
          max="4"
          value={form.credits}
          onChange={handleChange}
          placeholder="1 to 4"
        />
        {errors.credits && <p className="field-error">{errors.credits}</p>}

        <label>Instructor Name</label>
        <input
          name="instructorName"
          value={form.instructorName}
          onChange={handleChange}
          placeholder="Enter instructor name"
        />
        {errors.instructorName && (
          <p className="field-error">{errors.instructorName}</p>
        )}

        <label>Instructor Email</label>
        <input
          name="instructorEmail"
          type="email"
          value={form.instructorEmail}
          onChange={handleChange}
          placeholder="instructor@email.com"
        />
        {errors.instructorEmail && (
          <p className="field-error">{errors.instructorEmail}</p>
        )}

        <Button type="submit">Add Course</Button>

        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}

export default CourseForm;
