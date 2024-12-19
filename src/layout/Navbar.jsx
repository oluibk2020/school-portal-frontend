import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { storeContext } from "../context/storeContext";

function Navbar() {
  const { isAuth, isOpen, setIsOpen } = useContext(storeContext);

 
  const navLinkClass = "block py-2 pr-4 pl-3 text-gray-700 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-600 md:dark:hover:bg-transparent"

  //getting variables from env in vite
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://charisintelligence.com.ng/wp-content/uploads/2022/04/cropped-chari-color-nobg1-300x136.png"
            className="mr-3 h-9 sm:h-9"
            alt="Charis intelligence logo"
          />
          {/* <span className="self-center text-l font-semibold whitespace-nowrap dark:text-white logo">
            School Portal
          </span> */}
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              {isAuth ? (
                <>
                  <NavLink
                    to="/dashboard"
                    activeclassname="active"
                    className={navLinkClass}
                  >
                    Dashboard
                  </NavLink>
                </>
              ) : (
                <></>
              )}{" "}
            </li>
            {isAuth ? (
              <>
                <li>
                  <NavLink
                    to="/enrolledcourses"
                    activeclassname="active"
                    className={navLinkClass}
                  >
                    Enrolled Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/courses"
                    activeclassname="active"
                    className={navLinkClass}
                  >
                    All Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wallet"
                    activeclassname="active"
                    className={navLinkClass}
                  >
                    Account
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signout"
                    activeclassname="active"
                    className={navLinkClass}
                  >
                    Sign Out
                  </NavLink>
                </li>
                <li>
                  <a
                    href="https://charisintelligence.com.ng"
                    className={navLinkClass}
                    target="_blank"
                  >
                    Back to Main Site
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    activeclassname="active"
                    className={navLinkClass}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/login"
                    className={navLinkClass}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <a
                    href="https://charisintelligence.com.ng"
                    className={navLinkClass}
                    target="_blank"
                  >
                    Back to Main Site
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
