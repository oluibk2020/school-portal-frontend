import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import { useContext } from "react";
import {storeContext} from "../context/storeContext";
import PaymentRedirect from "./PaymentRedirect";

function PaymentInvoice() {
  const { isLoading, setIsLoading, paymentLink, createPaymentInvoice, setIsOpen } =
    useContext(storeContext);

  const navigate = useNavigate();

   useEffect(() => {
     setIsOpen(false);
   }, []);
   
  //website url
  //get token from localstorage
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  //form data
  const [formData, setFormData] = useState({
    amount: "",
  });

  //extracting form data
  const { amount } = formData;

  //changing state of form data
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //create Invoice
  async function createInvoice() {
    try {
      if (amount < 1000) {
        return toast.error("Please deposit an amount greater than 1000");
      }
      //create transaction on server
      const response = await fetch(`${API_URL}/wallet/fund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: "ngn",
        }),
      });

      const data = await response.json();

      //if successful, then call payment link
      if (response.status === 200) {
        toast.success("Invoice has been created successfully");
        //generate payment link
        createPaymentInvoice(data.transaction.id);
      }

      if (response.status !== 200) {
        if (data.msg) {
          toast.error(data.msg);
        }

        if (!data.msg) {
          toast.error("Error funding your balance");
        }
      }

      setFormData({
        amount: "",
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Network error: try again");
      console.log(error);
    }
  }

  //submit
  async function onSubmitHandler(e) {
    e.preventDefault();

    //check amount validation
    if (amount > 200000) {
      return toast.error(`You cannot deposit more than 200 thousand naira`);
    }
    if (amount < 1000) {
      return toast.error(`You cannot deposit less than 1 thousand naira`);
    }
    setIsLoading(true);
    //create Invoice
    await createInvoice();
    setIsLoading(false);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (paymentLink.trim() !== "") {
    return <PaymentRedirect link={paymentLink} />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Deposit Naira to your Wallet
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          It's easy, sweet and fun
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Fill in the Details</p>

          <div className="col-span-6 sm:col-span-3 text-center">
            <label
              htmlFor="Amount"
              className="block text-sm font-medium text-white"
            >
              {" "}
              Amount{" "}
            </label>

            <input
              type="number"
              id="Amount"
              placeholder="30000"
              value={amount}
              required
              onChange={onChange}
              name="amount"
              className="mt-1 w-64 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-3"
            />
          </div>

          <button
            type="submit"
            className="block w-64 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium mx-auto"
          >
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
}
export default PaymentInvoice;
