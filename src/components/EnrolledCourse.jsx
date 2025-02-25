import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
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
  const [selectedLessonUrl, setSelectedLessonUrl] = useState("");
  const [selectedLessonTitle, setSelectedLessonTitle] = useState("");
  const [selectedLessonDescription, setSelectedLessonDescription] = useState("");
  const [sortedLessons, setSortedLessons] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const pageId = params.id;

  //check if sorted course is empty
  const isEmpty = Object.keys(sortedLessons).length === 0;

  useEffect(() => {
    setIsOpen(false);

    //set app to loading to get book data

    setIsLoading(true);
    //function to get book
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
          <div className="videoplayerCard bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="plyr">
              <Plyr
                source={{
                  type: "video",
                  sources: [{ src: selectedLessonUrl }],
                }}
                options={videoOptions}
              />
            </div>
            <div className="p-6 sm:p-8">
              <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
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
                href={course.codeUrl}
                className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download Course Codes
              </a>
              <a
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

          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <h2 className="text-2xl font-bold text-center py-4 text-gray-900 dark:text-white">
              Lessons
            </h2>

            <ul className="space-y-4 px-4 sm:px-6 lg:px-8 py-4">
              {Object.keys(sortedLessons).length === 0
                ? "No lessons found"
                : sortedLessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600"
                      onClick={() => {
                        //set selected lesson
                        setSelectedLessonUrl(lesson.videoUrl);
                        //set selectedLesson Description
                        setSelectedLessonDescription(lesson.description);
                        //set selectedLesson Title
                        setSelectedLessonTitle(lesson.title);
                        //scroll to video player
                        handleScroll("videoPlayer");
                      }}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
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
                        <FaRegCirclePlay className="text-xl text-gray-600 dark:text-gray-300" />
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      )}
      <Courses />
    </div>
  );
}
export default EnrolledCourse;
