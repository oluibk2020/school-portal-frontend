import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const {
    setIsAuth,
    isLoading,
    setIsLoading,
    userEmail,
    setUserEmail,
    setIsOpen,
  } = useContext(storeContext);

  const navigate = useNavigate();

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

  async function loginUser() {
    try {
      //set user email globally
      setUserEmail(email);

      //call api
      const response = await fetch(`${API_URL}/auth/login-request`, {
        method: "POST", //PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      //store response info in data
      const data = await response.json();

      if (response.status === 200) {
        //clear screen
        setEmail("");
        setPassword("");

        //move the user to login verification screen
        navigate("/loginverification");
        //set isloading to false
        setIsLoading(false);
      } else {
        toast.error("Login failed. Please try again");
        setEmail("");
        setPassword("");
        setIsLoading(false);
        return;
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

  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function loginHandler(e) {
    e.preventDefault();
    //set loading to true
    setIsLoading(true);
    //call login user
    loginUser();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Sign In today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Login to get access to all the features of our platform. Watch free
            classes, make payments, and much more.
          </p>

          <form
            onSubmit={loginHandler}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <div className=" mx-0 my-auto">
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                  />
                </div>
              </GoogleOAuthProvider>

              <div className="py-6 text-center">
                <p>Or continue with email and password</p>
              </div>
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
              Sign in
            </button>

            <p className="text-center text-sm">
              <Link className="underline" to="/resetpassword">
                Forgotten password?
              </Link>
            </p>

            <p className="text-center text-sm text-gray-500">
              No account?{" "}
              <Link className="underline" to="/register">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
