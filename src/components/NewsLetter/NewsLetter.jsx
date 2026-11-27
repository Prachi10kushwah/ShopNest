import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }
    toast.success("Thank you for subscribing! Check your inbox for exclusive offers.");
    setEmail("");
  };

  return (
    <div className="bg-[#FDECE2] py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl sm:text-5xl font-bold font-['Cormorant_Garamond'] text-[#11231e]">
          Get Exclusive Offers On Your Email
        </h1>

        <p className="text-base sm:text-lg text-[#555] max-w-xl">
          Subscribe to the ShopNest newsletter and be the first to know about new arrivals, limited sales, and special coupon codes.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-between bg-white w-full max-w-2xl rounded-3xl sm:rounded-full border border-[#d8c8bf] p-1.5 sm:p-2 shadow-sm mt-4 gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:flex-1 px-5 py-3 text-base text-[#11231e] outline-none bg-transparent"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#11231e] text-white font-medium rounded-full hover:bg-[#203A35] transition-all duration-300 cursor-pointer text-sm sm:text-base flex-shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
