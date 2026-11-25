
// Name: Adeena Akram
// Registration No: 2500605

import { createContext, useReducer, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

export const CourseContext = createContext();

const initialState = {
  courses: [],
  enrolments: {},
  deletedIds: []
};

function courseReducer(state, action) {
  switch (action.type) {
    case "LOAD_COURSES":
      return {
        ...state,
        courses: [
          ...action.payload.filter(
            (course) => !state.deletedIds.includes(course.id)
          ),
          ...state.courses.filter(
            (course) =>
              !action.payload.some((item) => item.id === course.id)
          )
        ]
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.id !== action.payload
        ),
        deletedIds: [...new Set([...state.deletedIds, action.payload])],
        enrolments: Object.fromEntries(
          Object.entries(state.enrolments).map(([username, ids]) => [
            username,
            ids.filter((id) => id !== action.payload)
          ])
        )
      };

    case "ENROL":
      return {
        ...state,
        enrolments: {
          ...state.enrolments,
          [action.username]: [
            ...(state.enrolments[action.username] || []),
            action.courseId
          ]
        }
      };

    case "DROP":
      return {
        ...state,
        enrolments: {
          ...state.enrolments,
          [action.username]: (
            state.enrolments[action.username] || []
          ).filter((id) => id !== action.courseId)
        }
      };

    default:
      return state;
  }
}

export function CourseProvider({ children }) {
  const { data, loading, error } = useFetch("/courses.json");

  const [savedState, setSavedState] = useLocalStorage(
    "coursePortalData",
    initialState
  );

  const [state, dispatch] = useReducer(
    courseReducer,
    savedState
  );

  useEffect(() => {
    if (data.length > 0) {
      dispatch({
        type: "LOAD_COURSES",
        payload: data
      });
    }
  }, [data]);

  useEffect(() => {
    setSavedState(state);
  }, [state]);

  const addCourse = (course) => {
    dispatch({
      type: "ADD_COURSE",
      payload: course
    });
  };

  const deleteCourse = (id) => {
    dispatch({
      type: "DELETE_COURSE",
      payload: id
    });
  };

  const enrolCourse = (username, courseId) => {
    const enrolled = state.enrolments[username] || [];

    if (enrolled.includes(courseId)) {
      return "You are already enrolled in this course!";
    }

    const course = state.courses.find(
      (item) => item.id === courseId
    );

    if (!course) {
      return "Course not found!";
    }

    const totalCredits = state.courses
      .filter((item) => enrolled.includes(item.id))
      .reduce((total, item) => total + item.credits, 0);

    if (totalCredits + course.credits > 18) {
      return "You cannot enrol in more than 18 credits!";
    }

    dispatch({
      type: "ENROL",
      username,
      courseId
    });

    return "Successfully enrolled!";
  };

  const dropCourse = (username, courseId) => {
    dispatch({
      type: "DROP",
      username,
      courseId
    });
  };

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        enrolments: state.enrolments,
        addCourse,
        deleteCourse,
        enrolCourse,
        dropCourse,
        loading,
        error
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
