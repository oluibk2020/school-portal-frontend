import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Dashboard() {
  const { userProfile, isLoading, setIsLoading, setIsOpen} =
    useContext(storeContext);
  const navigate = useNavigate();
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  //check if profile is empty
  const isProfileEmpty = Object.keys(userProfile).length === 0;

  //close menubar automatically on app load
  useEffect(() => {
    setIsOpen(false);
  }, []);

  //popup
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleImageClick = () => {
    navigate("/services"); // Replace with your target page route
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };


  if (isLoading || isProfileEmpty) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>
          Your Learning Dashboard | CharisIntelligence - Track Your Progress
        </title>
        <meta
          name="description"
          content="Manage your courses, track your learning progress, and explore new software engineering and tech skills directly from your personalized CharisIntelligence dashboard."
        />
        <meta
          name="keywords"
          content="learning dashboard, track progress, software engineering courses, coding platform, tech education portal, manage tech skills,CharisIntelligence dashboard"
        />
        <meta name="author" content="CharisIntelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${FRONTEND_URL}/dashboard`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      <section className="relative">
        {/* Popup */}
        {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg p-6 shadow-lg">
              <img
                src="https://charisintelligence.com.ng/wp-content/uploads/2024/12/whats.jpg" // Replace with your image URL
                alt="Popup"
                className="w-96 h-auto rounded cursor-pointer transition-transform hover:scale-105"
                onClick={handleImageClick}
                loading="lazy"
              />
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold"
                onClick={closePopup}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <div className="py-16 bg-blue-500 flex flex-col justify-center">
          <div className="container mx-auto p-4">
            <h1 className="text-6xl font-bold text-white text-center">
              Welcome to Your Dashboard
            </h1>
            <p className="text-2xl text-white my-4 text-center">
              Hello, {userProfile.fullName}! Explore your enrolled courses and
              manage your account.
            </p>
            <div className="flex flex-wrap justify-center">
              <Link
                to="/courses"
                className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
              >
                <h2 className="text-2xl font-bold">Courses</h2>
                <p className="text-gray-600">Browse our courses.</p>
              </Link>
              <Link
                to="/wallet"
                className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
              >
                <h2 className="text-2xl font-bold">Account</h2>
                <p className="text-gray-600">View or manage your account.</p>
              </Link>
              <Link
                to="/profile"
                className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
              >
                <h2 className="text-2xl font-bold">Profile</h2>
                <p className="text-gray-600">View or manage your profile.</p>
              </Link>
              <Link
                to="/enrolledcourses"
                className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
              >
                <h2 className="text-2xl font-bold">Enrolled Courses</h2>
                <p className="text-gray-600">Access your enrolled courses.</p>
              </Link>
              <Link
                to="/services"
                className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
              >
                <h2 className="text-2xl font-bold">Services</h2>
                <p className="text-gray-600">
                  Pay your admission or school fees.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
