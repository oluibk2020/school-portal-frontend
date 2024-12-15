import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { storeContext } from "../context/storeContext";

function Hero() {

  const { setIsOpen } = useContext(storeContext);
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
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
  );
}
export default Hero;
