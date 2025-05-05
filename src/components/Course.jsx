import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import _ from "lodash";

function Course() {
  const { course, isLoading, getOneCourse, setIsLoading, setIsOpen , wallet} =
    useContext(storeContext);
  const [sortedLessons, setSortedLessons] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add search state
  const navigate = useNavigate();
  const params = useParams();
  const pageId = params.id;
  //get token from localstorage
  const token = localStorage.getItem("token");
  //website url
  const API_URL = import.meta.env.VITE_API_URL;

  //check if course is empty
  const isEmpty = Object.keys(course).length === 0;

  useEffect(() => {
    //set app to loading to get book data
    setIsLoading(true);

    //close navbar
    setIsOpen(false);

    //function to fetch course
    async function fetchCourse() {
      const data = await getOneCourse(pageId);

      //sort lessons
      const sortedLessons = _.orderBy(data.lessons, ["id"], ["asc"]);
      setSortedLessons(sortedLessons);

      setIsLoading(false);
    }

    //call function to get book
    fetchCourse();
  }, []);

  async function registerCourse() {
    try {
      //create transaction on server
      const response = await fetch(`${API_URL}/courses/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: parseInt(pageId),
          currency: wallet,
        }),
      });

      const data = await response.json();

      //if successful, then call payment link
      if (response.status === 201) {
        toast.success("You have enrolled for this course successfully");
        //navigate to enrolled course
        navigate("/enrolledcourses");
      } else if (response.status === 400) {
        toast.error(data.msg);
        navigate("/enrolledcourses");
      } else if (response.status === 401) {
        toast.error(data.msg);
        navigate("/wallet");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Network error: try again");
      console.log(error);
    }
  }

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter lessons based on search query
  const filteredLessons = sortedLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Use sortedLessons if search is empty, else use filteredLessons
  const lessonsToDisplay = searchQuery.trim() ? filteredLessons : sortedLessons;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-700">
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
              We are fetching the course for you from the server
            </h2>
            <p className="text-xl text-center">Please try again later</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-primary text-secondary rounded-lg shadow-lg">
            <button
              type="button"
              onClick={() => navigate(`/courses`)}
              className="m-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Back to All Courses
            </button>
            <div className="px-6 py-8">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="mt-4 text-lg">{course.description}</p>
              <p className="mt-4 font-bold text-lg">
                Price:{" "}
                {course.price == "0"
                  ? "Free"
                  : `₦${Number(course.price).toLocaleString()} NGN`}
              </p>
              <button
                type="button"
                onClick={() => {
                  registerCourse();
                }}
                className="mt-4 px-6 py-2 bg-secondary text-primary rounded-lg shadow-lg hover:bg-primary hover:text-secondary transition duration-300"
              >
                Enroll Now
              </button>
            </div>
            {/* Search Input */}
            <div className="px-6 py-4">
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 text-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Lessons */}
            <div className="px-6 py-4 border-t">
              <h2 className="text-2xl font-bold">Lessons</h2>
              {lessonsToDisplay.length === 0 ? (
                <p className="text-red-500">No lessons found</p>
              ) : (
                <ul className="mt-4">
                  {lessonsToDisplay.map((lesson) => (
                    <li key={lesson.id} className="flex items-center py-2">
                      <img
                        src={lesson.imageUrl}
                        alt={lesson.title}
                        className="w-20 h-20 mr-4"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{lesson.title}</h3>
                        <p className="text-sm">{lesson.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Course;
