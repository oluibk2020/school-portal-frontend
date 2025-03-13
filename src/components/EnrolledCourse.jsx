import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/Spinner";
import Courses from "./Courses";
import { FaRegCirclePlay } from "react-icons/fa6";
import _ from "lodash";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

function EnrolledCourse() {
  const { course, isLoading, getOneEnrolledCourse, setIsLoading, setIsOpen } =
    useContext(storeContext);
  const [searchQuery, setSearchQuery] = useState(""); // Add search state
  const [selectedLessonUrl, setSelectedLessonUrl] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [selectedLessonTitle, setSelectedLessonTitle] = useState("");
  const [selectedLessonDescription, setSelectedLessonDescription] =
    useState("");
  const [sortedLessons, setSortedLessons] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const pageId = params.id;
  const [isFixed, setIsFixed] = useState(true); // Default: Fixed position

  //to control fixed position for display of player and lesson on desktop
  useEffect(() => {

    const checkAndObserve = () => {
      const coursesSection = document.getElementById("coursesSection");
      const videoSection = document.getElementById("videoPlayerSection");

      if (!coursesSection || !videoSection) {
        console.warn("Courses section not found. Retrying...");
        setTimeout(checkAndObserve, 500); // Retry after 500ms
        return;
      }

      console.log("Courses section found. Setting up observer...");

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsFixed(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: "100px 0px -100px 0px", // Adjust to trigger state change earlier
          threshold: 0, // Change state as soon as the section appears
        }
      );

      observer.observe(coursesSection);

      return () => observer.disconnect();
    };

    checkAndObserve(); // Run the function on mount
  }, []);

  //check if sorted course is empty
  const isEmpty = Object.keys(sortedLessons).length === 0;

  //fetch course on app load
  useEffect(() => {
    setIsOpen(false);

    setIsLoading(true);
    //function to get course
    async function fetchCourse() {
      const data = await getOneEnrolledCourse(pageId);
      const sortedLessons = _.orderBy(data.lessons, ["id"], ["asc"]);

      //set selected lesson to the first lesson in the course
      setSelectedLessonUrl(sortedLessons[0].videoUrl);

      //set selected lesson title to the first lesson in the course
      setSelectedLessonTitle(sortedLessons[0].title);

      //set selected lesson description to the first lesson in the course
      setSelectedLessonDescription(sortedLessons[0].description);

      //set sorted lessons in state
      setSortedLessons(sortedLessons);
    }

    //call function to get course
    fetchCourse();

    setIsLoading(false);
  }, []);

  //plyr video options
  const videoOptions = {
    controls: [
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings", // Needed for playback speed
      "fullscreen",
    ],
    settings: ["speed"], // Enable playback speed setting
    speed: { selected: 1, options: [0.5, 1, 1.5, 2] }, // Speed options
  };

  //handle scroll
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchQuery = () => {
    setSearchQuery(""); // Clear the search query
  };

  // Filter lessons based on search query
  const filteredLessons = sortedLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Use sortedLessons if search is empty, else use filteredLessons
  const lessonsToDisplay = searchQuery.trim() ? filteredLessons : sortedLessons;

  if (isLoading || isEmpty) {
    return <Spinner />;
  }

  return (
    <div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-700">
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
              We are getting the course for you from the server
            </h2>
            <p className="text-xl text-center">Please be patient</p>
          </div>
        </div>
      ) : (
        <div
          className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8"
          id="videoPlayer"
        >
          <div
            className={
              isFixed
                ? "videoplayerCardDesktop transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                : "videoplayerCard bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            }
            id="videoPlayerSection"
          >
            <div className="plyr">
              <Plyr
                source={{
                  type: "video",
                  sources: [{ src: selectedLessonUrl }],
                }}
                options={videoOptions}
              />
            </div>

            <div className="flex justify-between mt-4 mx-4">
              <button
                className={`bg-gray-500 text-white py-2 px-4 rounded ${
                  selectedLessonId === sortedLessons[0]?.id
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  const currentIndex = sortedLessons.findIndex(
                    (lesson) => lesson.id === selectedLessonId
                  );
                  if (currentIndex > 0) {
                    const prevLesson = sortedLessons[currentIndex - 1];
                    setSelectedLessonId(prevLesson.id);
                    setSelectedLessonUrl(prevLesson.videoUrl);
                    setSelectedLessonTitle(prevLesson.title);
                    setSelectedLessonDescription(prevLesson.description);
                    handleScroll("videoPlayer");
                  }
                }}
                disabled={selectedLessonId === sortedLessons[0]?.id}
              >
                Previous
              </button>

              <button
                className={`bg-blue-500 text-white py-2 px-4 rounded ${
                  selectedLessonId ===
                  sortedLessons[sortedLessons.length - 1]?.id
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => {
                  const currentIndex = sortedLessons.findIndex(
                    (lesson) => lesson.id === selectedLessonId
                  );

                  if (currentIndex < sortedLessons.length - 1) {
                    const nextLesson = sortedLessons[currentIndex + 1];
                    setSelectedLessonId(nextLesson.id);
                    setSelectedLessonUrl(nextLesson.videoUrl);
                    setSelectedLessonTitle(nextLesson.title);
                    setSelectedLessonDescription(nextLesson.description);
                    handleScroll("videoPlayer");
                  }
                }}
                disabled={
                  selectedLessonId ===
                  sortedLessons[sortedLessons.length - 1]?.id
                }
              >
                Next
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-3xl max-[480px]:text-2xl font-bold text-center text-gray-900 dark:text-white">
                Course - {course.title}
              </h1>
              <div className="my-2 py-4 px-2 border border-gray-400 bg-gray-700 dark:bg-gray-700">
                <h3 className="text-xl  p-2 font-bold text-center text-white dark:text-white">
                  Lesson - {selectedLessonTitle}
                </h3>
                <p className="mt-1 text-lg text-center text-gray-200 dark:text-gray-200">
                  {selectedLessonDescription}
                </p>
              </div>
              <a
                target="_blank"
                download
                href={course.codeUrl}
                className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download Course Codes
              </a>
              <a
                target="_blank"
                download
                href={course.pdfUrl}
                className="mt-4 mx-4 inline-block bg-black text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download Course PDF
              </a>
              <button
                type="button"
                onClick={() => navigate(`/enrolledcourses`)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Back to Enrolled Courses
              </button>
            </div>
          </div>

          <div
            className={
              isFixed
                ? "lessonSectionDesktop flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                : "flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
            }
            id="lessonSection"
          >
            {/* Search Input */}
            <div className="px-6 py-4">
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 text-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* hide clear button if search query is empty */}
              {searchQuery.trim().length === 0 ? (
                ""
              ) : (
                <button
                  type="button"
                  onClick={() => clearSearchQuery()}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Clear
                </button>
              )}
            </div>
            {/* Lessons */}
            <h2 className="text-2xl font-bold text-center py-4 text-gray-900 dark:text-white">
              Lessons
            </h2>

            <ul className="space-y-4 px-4 sm:px-6 lg:px-8 py-4">
              {lessonsToDisplay.length === 0 ? (
                <p className="text-red-500">No lessons found</p>
              ) : (
                lessonsToDisplay.map((lesson) => (
                  <li
                    key={lesson.id}
                    className={
                      lesson.id === selectedLessonId
                        ? `flex items-center bg-blue-600 dark:bg-blue-600 rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 `
                        : `flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600`
                    }
                    onClick={() => {
                      //set selected lesson
                      setSelectedLessonUrl(lesson.videoUrl);
                      //set selectedLesson Description
                      setSelectedLessonDescription(lesson.description);
                      //set selectedLesson Title
                      setSelectedLessonTitle(lesson.title);
                      //scroll to video player
                      handleScroll("videoPlayer");
                      //set selected lesson id
                      setSelectedLessonId(lesson.id);
                    }}
                  >
                    <div className="flex-1">
                      <h3
                        className={
                          lesson.id === selectedLessonId
                            ? "text-lg font-bold text-white dark:text-white"
                            : "text-lg font-bold text-gray-900 dark:text-white"
                        }
                      >
                        {lesson.title}
                      </h3>
                      <p
                        className={
                          lesson.id === selectedLessonId
                            ? "text-sm text-gray-200 dark:text-gray-200"
                            : "text-sm text-gray-600 dark:text-gray-300"
                        }
                      >
                        {lesson.description.length > 70 ? (
                          <>
                            {lesson.description.slice(0, 70)}
                            <span>... </span>
                          </>
                        ) : (
                          course.description
                        )}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <FaRegCirclePlay
                        className={
                          lesson.id === selectedLessonId
                            ? "text-xl text-white dark:text-white"
                            : "text-xl text-gray-600 dark:text-gray-300"
                        }
                      />
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
      <div id="coursesSection">
        <Courses />
      </div>
    </div>
  );
}
export default EnrolledCourse;
