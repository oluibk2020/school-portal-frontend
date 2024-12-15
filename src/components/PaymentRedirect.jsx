import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";

function PaymentRedirect({ link }) {
  const { setPaymentLink } = useContext(storeContext);

  const navigate = useNavigate();

  function resetPaymentLink() {
    setPaymentLink("");
    navigate("/wallet");
  }


  return (
    <section className="mt-12 rounded-3xl shadow-2xl">
      <div className="p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-white">
          Your transaction is now pending
        </p>

        <h2 className="mt-6 text-3xl font-bold">
         You will be redirected to a payment gateway on another tab for you to make a deposit to
          your wallet!
        </h2>

        <a
          className="mt-6 inline-block w-64 rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
          href={link}
          target="_blank"
          onClick={resetPaymentLink}
          rel="noopener noreferrer"
        >
          Deposit Now
        </a>
      </div>
    </section>
  );
}
export default PaymentRedirect;
