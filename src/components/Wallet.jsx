import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import { MdCallReceived } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import Transactions from "./Transactions";

function Wallet() {
  const {
    isLoading,
    setIsLoading,
    walletBalance,
    fetchBalance,
    wallet,
    setWallet,
    userProfile,
    fetchProfile,
    setIsOpen,
  } = useContext(storeContext);

  //navigate
  const navigate = useNavigate();

  function selectWallet(e) {
    setWallet(e.target.value);
  }

  //check if transaction is empty
  const isProfileEmpty = Object.keys(userProfile).length === 0;

  const country = userProfile.country;

  //run this code when page loads
  

  useEffect(() => {

    async function runAtStartup() {
      setIsLoading(true);
      await fetchProfile();
      await fetchBalance(wallet);
      setIsLoading(false);
    }

    runAtStartup();

    setIsLoading(false);
  }, [wallet, country]);

  if (isLoading || isProfileEmpty || walletBalance === "") {
    return <Spinner />;
  }

  return (
    <>
      <div className="px-5 xl:px-12 py-6  items-center   lg:ml-10">
        <div className="col-span-6 sm:col-span-3 my-4">
          <label
            htmlFor="Wallet"
            className="block text-sm font-medium text-white pb-2"
          >
            {" "}
            Select a Wallet
          </label>
          <div className="flex">
            <img
              className="w-10 h-10 rounded-full"
              src={
                wallet === "usd"
                  ? "https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1200px-Flag_of_Nigeria.svg.png"
              }
              alt="Rounded avatar"
            />
            <select
              id="Wallet"
              required
              value={wallet}
              onChange={selectWallet}
              className="h-10 rounded border-gray-300 text-sm w-32 border ml-1"
            >
              <option value="ngn">NGN</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
        <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6  w-80">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>

            <div>
              <div>
                <p className="text-sm text-gray-500">Wallet Balance</p>

                <p className="text-2xl font-medium text-gray-900">
                  {wallet === "ngn" ? (
                    <>₦{Number(walletBalance).toLocaleString()} NGN</>
                  ) : (
                    <>${Number(walletBalance).toLocaleString()} USD</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </article>
        <div className="mt-3">
          {wallet === "ngn" ? (
            <>
              <Link
                className="btn hover:primary-accent bg-yellow-600 text-white mx-3 my-3"
                to="/walletdeposit"
              >
                Fund Wallet <MdCallReceived className="text-lg" />
              </Link>
              <Link
                className="btn mx-3 text-white bg-secondary my-3"
                to="/services"
              >
                Pay For Services <LuSendHorizontal />
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Transactions currency={wallet} />
    </>
  );
}
export default Wallet;
