import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

function Dashboard() {
  const { userProfile, isLoading, setIsLoading, setIsOpen } =
    useContext(storeContext);
  const navigate = useNavigate();

  //check if transaction is empty
  const isProfileEmpty = Object.keys(userProfile).length === 0;

  useEffect(() => {
    setIsOpen(false);
  }, []);

  if (isLoading || isProfileEmpty) {
    return <Spinner />;
  }

  return (
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
            to="/enrolledcourses"
            className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
          >
            <h2 className="text-2xl font-bold">Enrolled Courses</h2>
            <p className="text-gray-600">Access your enrolled courses.</p>
          </Link>
          <Link
            to="/enrolledcourses"
            className="bg-white p-4 rounded-lg shadow-lg m-4 w-64"
          >
            <h2 className="text-2xl font-bold">Services</h2>
            <p className="text-gray-600">Pay your admission or school fees.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
