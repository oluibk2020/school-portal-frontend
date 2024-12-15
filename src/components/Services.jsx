import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import PaymentRedirect from "./PaymentRedirect";
import { div } from "motion/react-client";
import { truncate } from "lodash";

function Services() {
  const { isLoading, setIsLoading, services, wallet, walletBalance, setIsOpen } =
    useContext(storeContext);

    const [selectedService, setSelectedService] = useState(null);
    const [hideServices, setHideServices] = useState(false);
   
  const navigate = useNavigate();
  //website url
  //get token from localstorage
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

   useEffect(() => {
     setIsOpen(false);
   }, []);

   async function payService(serviceId) {
     try {
       const response = await fetch(`${API_URL}/services/pay/${serviceId}`, {
         method: "GET", //PUT
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`, //your token
         },
       });

       const data = await response.json();

       if (response.status === 200) {
        toast.success(data.msg);
         navigate("/wallet");
       } else {
         toast.error(data.msg);
       }
     } catch (error) {
       console.log(error);
     }
   }


  //submit
  async function onSubmitHandler(e) {
    e.preventDefault();

    setIsLoading(true);
    //create Invoice
    await payService(selectedService.id)
    setIsLoading(false);
  }

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <div className="container mx-auto px-4 lg:py-24 py-32 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold leading-tight text-center sm:text-4xl">
          Pay Easily For Charis Intelligence Services From Your Wallet
        </h1>

        <p className="mt-4 text-gray-600 text-center">
          It's easy, sweet and fun
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {!hideServices
            ? services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <h2 className="text-2xl font-bold">{service.name}</h2>
                  <p className="text-gray-600 py-4">{service.description}</p>
                  <p className="text-gray-900 font-bold text-xl">
                    ₦{service.amount.toLocaleString()} NGN
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedService(service);
                      setHideServices(true);
                    }}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Select
                  </button>
                </div>
              ))
            : ""}
        </div>

        {selectedService && (
          <form
            onSubmit={onSubmitHandler}
            className="mt-8 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <h2 className="text-2xl font-bold text-center text-primary">
              You are about to pay for {selectedService.name} from your wallet
            </h2>

            <p className="py-4 text-2xl font-medium  text-center">
              {wallet === "ngn" ? (
                <>
                  {" "}
                  Wallet Balance: ₦{Number(walletBalance).toLocaleString()} NGN
                </>
              ) : (
                <></>
              )}
            </p>

            <p className="mt-4 text-white text-center">
              Amount: ₦{selectedService.amount.toLocaleString()} NGN
            </p>

            <button
              type="submit"
              className="mt-4 block w-64 rounded-lg bg-yellow-600 text-white px-5 py-3 text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto"
            >
              Pay
            </button>
          </form>
        )}
      </div>
    </div>
  );

}
export default Services;
