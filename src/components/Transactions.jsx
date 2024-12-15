import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import _ from "lodash";

function Transactions({ currency }) {
  const navigate = useNavigate();
  const {
    isLoading,
    setIsLoading,
    fetchTransactions,
    transactions,
  } = useContext(storeContext);

  //lodash to sort
  const sortedTransactions = _.orderBy(transactions, ["id"], ["desc"]);

  useEffect(() => {
    setIsLoading(true);

    //fetch account activities automatically
      fetchTransactions(currency);

    setIsLoading(false);
  }, [currency]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 container">
      <div className="flex justify-between">
        <p>Your transaction history </p>
        {/* <motion.div
          animate={{ x: "-100%" }} // Move to the left (end of viewport)
          transition={{ duration: 3, ease: "easeIn", repeat: Infinity }} // Loop animation
          style={{ top: 0, left: 0 }} // Set initial position
        >
          <FaLongArrowAltRight className="lg:hidden text-white text-4xl " />
        </motion.div> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right text-base">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Payment Type
              </th>
              <th className="hidden md:block md:whitespace-nowrap md:px-4 md:py-2 md:font-medium md:text-gray-900">
                Date of Transaction
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Total Amount
              </th>
              <th className="hidden md:block md:whitespace-nowrap md:px-4 md:py-2 md:font-medium md:text-gray-900">
                Status
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Object.keys(transactions).length === 0
              ? null
              : sortedTransactions.map((item, index) => {
                  const convertedTime = new Date(item.updatedAt).toLocaleString(
                    "en-US",
                    {
                      timeZone: "Africa/Lagos",
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }
                  );
                  return (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {item.type}
                      </td>
                      <td className="hidden md:block md:whitespace-nowrap md:px-4 lg:py-2 md:text-gray-700">
                        {convertedTime}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {item.totalAmount}
                        {item.currency === null ? "Naira" : item.currency}
                      </td>
                      <td
                        className={
                          item.status === "failed"
                            ? "whitespace-nowrap px-4 py-2 text-red-700"
                            : "hidden md:block md:whitespace-nowrap md:px-4 md:py-2 md:text-gray-700"
                        }
                      >
                        {item.status}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <Link
                          to={`/transaction/${item.id}`}
                          className="inline-block rounded bg-secondary px-4 py-2 text-xs font-medium text-white hover:bg-secondary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Transactions;
