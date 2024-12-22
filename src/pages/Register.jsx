import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Helmet } from "react-helmet-async";

function Register() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const { isLoading, setIsLoading, setIsOpen, setIsAuth } = useContext(storeContext);
  
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    setIsOpen(false);
  }, []);

    const handleGoogleLoginSuccess = async (response) => {
      try {
        setIsLoading(true);
        // Send the token to your backend for verification
        const res = await fetch(`${API_URL}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        });

        if (!res.ok) {
          toast.error("Failed to authenticate with the server");
        }

        const data = await res.json();

        // Handle the response (e.g., save JWT token in local storage)
        //  console.log("Server Response:", data);
        localStorage.setItem("token", data.access_token); // Save JWT for future API calls
        setIsAuth(true);
        toast.success("login successful");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during Google login:", error.message);
      }
    };

    // Handle Google Login error
    const handleGoogleLoginError = () => {
      setIsLoading(false);
      toast.error("Google Login Failed");
    };

  async function registerUser() {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST", //PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          fullName: fullName.trim(),
          country: country.trim(),
        }),
      });

      //store response info in data
      const data = await response.json();

      if (response.status === 201) {
        //send notification
        toast.success(data.msg);
        //clear screen
        setEmail("");
        setPassword("");

        //move the user to login screen
        navigate("/login");
        //set loading to false
        setIsLoading(false);
      } else if (response.status === 400) {
        toast.error("Password needs to min of 6, uppercase, lowercase, number");
        setIsLoading(false);
      } else if (response.status === 401) {
        toast.error("User already exists");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.msg);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function toggle() {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangeFullName(e) {
    setFullName(e.target.value);
  }
  function onChangeCountry(e) {
    setCountry(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function signUpHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    //checks on form

    registerUser();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>
          Join CharisIntelligence | Register for Free Software Engineering
          Courses
        </title>
        <meta
          name="description"
          content="Sign up for CharisIntelligence and start learning software engineering, coding, and tech skills for free. Build your career with expert-led online courses today!"
        />
        <meta
          name="keywords"
          content="register for coding courses, join CharisIntelligence, free tech skills, sign up for software engineering, coding education, online tech platform registration"
        />
        <meta name="author" content="CharisIntelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${FRONTEND_URL}/register`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Register on our School portal today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Register and get access to our school portal. Watch free software
            development classes
          </p>

          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="pt-5  md:ml-20 lg:ml-32 xl:ml-40 2xl:ml-52">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                className="w-full sm:w-auto md:w-64 lg:w-80 xl:w-96 2xl:w-112 px-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
              />
            </div>
          </GoogleOAuthProvider>

          <form
            onSubmit={signUpHandler}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Or sign up with credentials
            </p>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-white"
              >
                {" "}
                FullName
              </label>

              <input
                type="text"
                id="fullname"
                value={fullName}
                onChange={onChangeFullName}
                required
                name="fullname"
                className="mt-1 w-full rounded-md border-gray-200  text-sm shadow-sm p-3"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Country"
                className="block text-sm font-medium text-white"
              >
                {" "}
                Country{" "}
              </label>

              <select
                id="Country"
                required
                onChange={onChangeCountry}
                className="h-10 rounded border-gray-300 text-sm w-32 border"
              >
                <option>Select Country</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
                <option value="FR">France</option>
                <option value="CAD">Canada</option>
                <option value="IE">Ireland</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SE">Sweden</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChangeEmail}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={onChangePassword}
                  required
                />

                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={toggle}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500">
              Have an account?{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
