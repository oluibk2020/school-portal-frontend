import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function LoginVerification() {
  const {
    isLoading,
    setIsLoading,
    setIsAuth,
    isAuth,
    userEmail,
    setIsOpen
  } = useContext(storeContext);

  //website url
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    token: "",
  });

  const { token } = formData;

  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //verify OTP during login
  async function verifyLogin(e) {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (token.trim().length === 5) {
        const response = await fetch(`${API_URL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email: userEmail,
          }),
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          setIsAuth(true);
          toast.success("login successful");
          navigate("/dashboard")
        } else {
          toast.error(data.msg);
        }
      } else {
        toast.error("token is incorrect");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Network error: try again");
    }
  }

  useEffect(() => {
    setIsOpen(false)
    if (userEmail === "") {
      navigate("/login");
    }
    if (isAuth === true) {

      //navigate
      navigate("/dashboard");
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
      <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Login Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                We care about you and are protecting all our users. We have sent
                a code to your email {userEmail === "" ? null : userEmail} for
                you to login to your account
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={verifyLogin}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="col-span-6 sm:col-span-3 w-full">
                    <label
                      htmlFor="otp"
                      className="block text-sm text-center font-bold text-white"
                    >
                      {" "}
                      Enter the OTP Sent to your Email{" "}
                    </label>

                    <input
                      type="number"
                      id="otp"
                      value={token}
                      required
                      onChange={onChange}
                      name="token"
                      maxLength="5"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-3"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-secondary border-none text-primary text-sm shadow-sm"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <Link
                      className="flex flex-row items-center text-blue-600"
                      to="/login"
                    >
                      Resend
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginVerification;
