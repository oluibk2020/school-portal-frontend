import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

function Profile() {
  const { userProfile, isLoading, setIsLoading, setIsOpen } =
    useContext(storeContext);

  //check if profile is empty
  const isProfileEmpty = Object.keys(userProfile).length === 0;

  useEffect(() => {
    setIsOpen(false);
  }, []);

  if (isLoading || isProfileEmpty) {
    return <Spinner />;
  }

  return (
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
  );
}
export default Profile;
