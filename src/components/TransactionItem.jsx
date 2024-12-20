import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import PaymentRedirect from "./PaymentRedirect";
import { tr } from "motion/react-client";

function TransactionItem() {
  const navigate = useNavigate();
  //params
  const params = useParams();

  const {
    isLoading,
    setIsLoading,
    transaction,
    paymentLink,
    fetchOneTransaction,
    createPaymentInvoice,
    setIsOpen,
    setPaymentLink,
  } = useContext(storeContext);

  //check if transaction is empty
  const isEmpty = Object.keys(transaction).length === 0;

  //check if date exceeded one hour
  const targetDate = new Date(transaction.createdAt);
  const currentDate = new Date();
  const oneHourInMilliseconds = 1000 * 60 * 60; // Milliseconds in 1 hour

  // Calculate the difference in milliseconds between current and target date
  const timeDifference = currentDate.getTime() - targetDate.getTime();

  useEffect(() => {
    //fetch account activities automatically
    async function runAtStartUp() {
      setIsLoading(true);

      await fetchOneTransaction(params.id);
      setIsLoading(false);
    }

    runAtStartUp();
    //
    setIsOpen(false);
  }, []);

  if (isLoading || isEmpty) {
    return <Spinner />;
  }

  function payNow() {
    try {
      setIsLoading(true);
      if (isEmpty === false) {
        if (transaction.status === "processing") {
          createPaymentInvoice(transaction.id); //generate payment link
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function openPaymentPopup(paymentUrl) {
    setIsLoading(true);
    toast.success("Loading payment page...!");

    // Open the payment URL in a popup window
    const popup = window.open(
      paymentUrl,
      "_blank",
      "width=380,height=500,scrollbars=yes,resizable=yes"
    );

    // Periodically check if the popup is closed
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        setIsLoading(false);
        setPaymentLink("");
        navigate("/wallet");
        // Handle return to the app here
        toast.success("Payment process completed! Returning to the app.");
      }
    }, 1000);
  }

  //open pop up if payment link is not empty
  if (paymentLink.trim() !== "") {
    openPaymentPopup(paymentLink);
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      {isEmpty ? (
        "No transaction data"
      ) : (
        <div className="my-10 mx-16">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Transaction Details
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500 mb-4">
            See the details about this transaction
          </p>
          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium">Reference ID</dt>
                <dd className="text-primary sm:col-span-2 text-wrap break-words">
                  {transaction.reference}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Amount</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {transaction.amount}
                  {transaction.currency === null ? "NGN" : transaction.currency}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium ">Fees</dt>
                <dd className="text-white sm:col-span-2">
                  {transaction.totalAmount - transaction.amount}
                  {transaction.currency === null ? "NGN" : transaction.currency}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Total Amount</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {transaction.totalAmount}
                  {transaction.currency === null ? "NGN" : transaction.currency}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium ">Details</dt>
                <dd className="text-white sm:col-span-2">
                  {transaction.otherDetails}
                </dd>
              </div>

              {transaction.sessionId !== null ? (
                <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Session ID</dt>
                  <dd className="text-gray-700 sm:col-span-2 text-wrap break-words">
                    {transaction.sessionId}
                  </dd>
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-1 p-3 bg-black sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium  ">Transaction Type</dt>
                <dd className="sm:col-span-2 text-white">{transaction.type}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 bg-black sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium  ">Date Of Transaction</dt>
                <dd className="text-white sm:col-span-2">
                  {new Date(transaction.createdAt).toLocaleString("en-US", {
                    timeZone: "Africa/Lagos",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 bg-black sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium ">Transaction Status</dt>
                <dd
                  className={
                    transaction.status === "failed"
                      ? "text-red-500"
                      : `text-white sm:col-span-2`
                  }
                >
                  {transaction.status}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 bg-black sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium ">Last Updated</dt>
                <dd className="text-white sm:col-span-2">
                  {new Date(transaction.updatedAt).toLocaleString("en-US", {
                    timeZone: "Africa/Lagos",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex mt-5 justify-center">
            <div className="pr-4">
              <Link
                to="/wallet"
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Back to all Transactions
              </Link>
            </div>
            {Object.keys(transaction).length !== 0 &&
            transaction.status === "processing" &&
            transaction.type === "deposit" &&
            timeDifference < oneHourInMilliseconds ? (
              <div
                onClick={payNow}
                className="block rounded bg-primary px-5 py-3 text-sm text-gray-700 transition hover:bg-gray-600 btn"
              >
                Deposit Now
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
export default TransactionItem;
