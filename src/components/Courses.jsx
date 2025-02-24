import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Helmet } from "react-helmet-async";

function Courses() {
  const navigate = useNavigate();
   const { courses,isLoading, setIsOpen } =
     useContext(storeContext);
     
      const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

      useEffect(() => {
        setIsOpen(false);
      }, []);

  if (isLoading || courses.length === 0) {
    return <Spinner />;
  }  

  return (
    <>
      <Helmet>
        <title>
          Explore Courses | CharisIntelligence - Free Software Engineering and
          Tech Training
        </title>
        <meta
          name="description"
          content="Browse our wide range of software engineering, coding, and tech courses. Start learning for free and build your skills for a successful tech career."
        />
        <meta
          name="keywords"
          content="tech courses, free coding classes, software engineering training, explore tech skills, CharisIntelligence courses, programming education"
        />
        <meta name="author" content="CharisIntelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${FRONTEND_URL}/courses`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <p className="text-gray-900 font-bold mt-2">
                  Price:{" "}
                  {course.price == "0"
                    ? "Free"
                    : `₦${Number(course.price).toLocaleString()} NGN`}
                </p>

                <button
                  type="button"
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Courses;
