import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { storeContext } from "../context/storeContext";

function Hero() {
  const { setIsOpen } = useContext(storeContext);
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
  useEffect(() => {
    setIsOpen(false);
  }, []);

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
      <section className="py-16 bg-blue-500 flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl text-white font-bold pt-5">
            Learn Software Engineering for Free
          </h1>
          <p className="text-2xl text-white mt-4">
            Unlock your potential with CharisIntelligence. Enroll now and start
            your journey into the world of software engineering.
          </p>
          <div className="flex items-center space-x-4 mt-8">
            <Link
              to="/login"
              className="bg-white py-2 px-4 text-secondary rounded-lg shadow-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-500 text-gray-900 py-2 px-4  rounded-lg shadow-lg"
            >
              Enroll Now
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 bg-yellow-500 text-gray-700 p-2 rounded">
                Affordable Fees
              </h3>
              <p className="text-gray-700">
                Pay admission and school fees conveniently through our portal.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 bg-yellow-500 text-gray-700 p-2 rounded">
                Free Learning
              </h3>
              <p className="text-gray-700">
                Access our courses for free and gain valuable skills.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 bg-yellow-500 text-gray-700 p-2 rounded">
                Mobile Friendly
              </h3>
              <p className="text-gray-700">
                Enjoy a seamless experience across all your devices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;
