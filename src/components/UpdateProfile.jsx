import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

function UpdateProfile() {
  const { userProfile, isLoading, setIsLoading, setIsOpen, fetchProfile } =
    useContext(storeContext);

  //check if profile is empty
  const isProfileEmpty = Object.keys(userProfile).length === 0;

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  //get token from localstorage
  const token = localStorage.getItem("token");

  async function updateProfile() {
    try {
      const response = await fetch(`${API_URL}/profile/update`, {
        method: "PUT", //PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //your token
        },
        body: JSON.stringify({
          mobile: mobile.trim(),
          fullName: fullName.trim(),
          country: country.trim(),
        }),
      });

      //store response info in data
      const data = await response.json();

      if (response.status === 203) {
        //send notification
        toast.success("profile updated successfully");
        //clear screen
        setMobile("");
        setFullName("");

        //fetch profile
        fetchProfile();

        //move the user to login screen
        navigate("/profile");
        //set loading to false
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function updateHandler(e) {
    e.preventDefault();

    //check if mobile is 11 digits
    if (mobile.trim().length !== 11) {
      toast.error("Mobile number must be valid 11 digits");
      return;
    }
    if (country.trim().length === 0) {
      toast.error("Country must be selected");
      return;
    }

    setIsLoading(true);
    updateProfile();
  }

  function onChangeFullName(e) {
    setFullName(e.target.value);
  }
  function onChangeMobile(e) {
    setMobile(e.target.value);
  }
  function onChangeCountry(e) {
    setCountry(e.target.value);
  }

  if (isLoading || isProfileEmpty) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={updateHandler}
          className="rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 space-y-6 border"
        >
          <p className="text-center text-lg font-medium">Update Your Profile</p>

          <div className="space-y-2">
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
              name="fullname"
              required
              className="mt-1 w-full rounded-md border-gray-200  text-sm shadow-sm p-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-white"
            >
              {" "}
              Mobile
            </label>

            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={onChangeMobile}
              name="mobile"
              required
              className="mt-1 w-full rounded-md border-gray-200  text-sm shadow-sm p-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
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
          <button
            type="submit"
            className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
export default UpdateProfile;
