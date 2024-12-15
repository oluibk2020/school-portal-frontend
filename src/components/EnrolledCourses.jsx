import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Courses from "./Courses";

function EnrolledCourses() {
  const navigate = useNavigate();
  const { enrolledCourses, getAllEnrolledCourses, isLoading, setIsLoading } =
    useContext(storeContext);

  useEffect(() => {
    //set app to loading to get book data
    setIsLoading(true);

    //function to get book
    async function fetchCourse() {
      const data = await getAllEnrolledCourses();
      setIsLoading(false);
    }

    //call function to get book
    fetchCourse();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Your Enrolled Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {enrolledCourses.map((course) => (
          <div
            key={course.course.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={course.course.imageUrl}
              alt={course.course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.course.title}</h2>
              <p className="text-gray-600 mt-2">{course.course.description}</p>
              <p className="text-gray-600 mt-2 flex items-center space-x-1">
                <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Enrolled
                </span>
                <span className="text-sm">
                  {new Date(course.startDate).toLocaleString("en-US", {
                    timeZone: "Africa/Lagos",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </span>
              </p>
              <p className="text-gray-600 mt-2 flex items-center space-x-1">
                <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Ends
                </span>
                <span className="text-sm">
                  {new Date(course.endDate).toLocaleString("en-US", {
                    timeZone: "Africa/Lagos",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </span>
              </p>

              <button
                type="button"
                onClick={() => navigate(`/enrolledcourse/${course.course.id}`)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Start Course
              </button>
            </div>
          </div>
        ))}
      </div>
      <Courses />
    </div>
  );
}
export default EnrolledCourses;
