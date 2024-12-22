import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Profile() {
  const { userProfile, isLoading, setIsLoading, setIsOpen } =
    useContext(storeContext);
    
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
          Your Profile | CharisIntelligence - Customize Your Learning Experience
        </title>
        <meta
          name="description"
          content="View and update your CharisIntelligence profile. Manage your account details and personalize your software engineering and tech learning journey with ease."
        />
        <meta
          name="keywords"
          content="user profile, manage account, update profile, CharisIntelligence settings, customize learning, tech education profile"
        />
        <meta name="author" content="CharisIntelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${FRONTEND_URL}/profile`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      <div className=" flex flex-col items-center justify-center p-4 md:p-16 pt-16">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <p className="font-bold text-gray-600">
              Country: {userProfile.country}
            </p>
            <p className="font-bold text-gray-600">
              Fullname: {userProfile.fullName}
            </p>
            <p className="font-bold text-gray-600">
              Email: {userProfile.user.email}
            </p>
            <p className="font-bold text-gray-600">
              Username: {userProfile.userName}
            </p>
            <p className="font-bold text-gray-600">
              Mobile: {userProfile.mobile ? userProfile.mobile : "Not provided"}
            </p>
            <p className="font-bold text-gray-600">
              <Link
                className="block w-64 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
                to="/updateprofile"
              >
                Update Profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
