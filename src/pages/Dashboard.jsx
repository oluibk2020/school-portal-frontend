import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Dashboard() {
  const { userProfile, isLoading, setIsLoading, setIsOpen } =
    useContext(storeContext);
  const navigate = useNavigate();
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  //check if profile is empty
  const isProfileEmpty = Object.keys(userProfile).length === 0;

  useEffect(() => {
    setIsOpen(false);
  }, []);

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
      <section className="py-16 bg-blue-500 flex flex-col justify-center">
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
      </section>
    </>
  );
}
export default Dashboard;
