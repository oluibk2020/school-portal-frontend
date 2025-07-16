import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { storeContext } from "../context/storeContext";

function Hero() {
  const { setIsOpen } = useContext(storeContext);
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const [certificateId, setCertificateId] = useState(""); // State for the input field
  const navigate = useNavigate(); // Initialize useNavigate hook

  /**
   * Handles the form submission for certificate verification.
   * Navigates to the /certificate/verify page with the entered ID.
   * @param {Event} e - The form submission event.
   */
  const handleVerifySubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (certificateId.trim()) {
      // Only navigate if the input is not empty
      navigate(`/certificate/verify?id=${certificateId.trim()}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Master Software Engineering & Tech Skills for Free | Start Learning
          Now!
        </title>
        <meta
          name="description"
          content="Unlock your tech potential with free courses in coding, and other tech skills. Join thousands learning to code and build their careers with CharisIntelligence today!"
        />
        <meta
          name="keywords"
          content="free coding courses, software engineering training, software engineering training in ikeja,software engineering training in sagamu, software engineering training in lagos, software engineering training in nigeria, free software engineering training, free tech training, free tech courses, free coding, free software engineering, free coding classes, free tech classes, free tech skills, free coding skills, learn to code free, online tech education, build tech skills, free programming classes, software development tutorials, start coding now, tech career training, CharisIntelligence platform"
        />
        <meta name="author" content="CharisIntelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${FRONTEND_URL}`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      // Main container for the hero section, using light blue background
      <section className="py-16 bg-blue-500 flex flex-col justify-center font-inter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section Content */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold pt-5 leading-tight">
            Learn Software Engineering for Free
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white mt-4 max-w-2xl">
            Unlock your potential with CharisIntelligence. Enroll now and start
            your journey into the world of software engineering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white py-3 px-6 text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto bg-yellow-500 text-gray-900 py-3 px-6 font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out text-center"
            >
              Enroll Now
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 bg-yellow-500 text-gray-700 p-2 rounded-md inline-block">
                Affordable Fees
              </h3>
              <p className="text-gray-700 mt-2">
                Pay admission and school fees conveniently through our portal.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 bg-yellow-500 text-gray-700 p-2 rounded-md inline-block">
                Free Learning
              </h3>
              <p className="text-gray-700 mt-2">
                Access our courses for free and gain valuable skills.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 bg-yellow-500 text-gray-700 p-2 rounded-md inline-block">
                Mobile Friendly
              </h3>
              <p className="text-gray-700 mt-2">
                Enjoy a seamless experience across all your devices.
              </p>
            </div>
          </div>

          {/* Certificate Verification Input */}
          <div className="mt-16 bg-blue-600 p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Verify Your Certificate
            </h2>
            <form
              onSubmit={handleVerifySubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="text"
                placeholder="Enter Certificate ID"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-gray-500"
                aria-label="Certificate ID"
              />
              <button
                type="submit"
                className="bg-blue-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold text-center w-full sm:w-auto"
              >
                Verify Certificate
              </button>
            </form>
            <p className="text-white text-opacity-80 text-sm mt-4 text-center">
              Enter the unique ID found on your certificate to verify its
              authenticity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;
