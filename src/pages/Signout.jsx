import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";

function Signout() {
  const navigate = useNavigate();
  const { setIsAuth, setIsOpen } = useContext(storeContext);

   useEffect(() => {
     setIsOpen(false) 
    },[])

  function signOutHandler() {
    localStorage.removeItem("token");
    toast.success("Signed out successfully");
    setIsAuth(false);
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-700">
      <div>
        <div className="rounded-lg bg-secondary p-8 shadow-2xl">
          <h2 className="text-lg font-bold">
            Are you sure you want to logout?
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Doing this means you have to login again to access your account, are
            you 100% sure it's OK?
          </p>

          <div className="mt-4 flex gap-2">
            <Link
              onClick={signOutHandler}
              to="/"
              className="rounded bg-error px-4 py-2 text-sm font-medium text-secondary"
            >
              Yes, I'm sure
            </Link>

            <Link
              to="/dashboard"
              className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signout;
