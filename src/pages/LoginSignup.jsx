import React from "react";

const LoginSignup = () => {
  return (
    <div className="w-full min-h-screen bg-[#FDECE2] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[580px] bg-white rounded-3xl shadow-xl border border-[#ead8cc] p-12">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#11231e] font-['Cormorant_Garamond'] text-center">
          Create Account
        </h1>

        <p className="text-center text-[#666] mt-3">
          Join ShopNest and discover timeless fashion.
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-6 mt-10">

          <input
            type="text"
            placeholder="Your Name"
            className="h-14 w-full px-5 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="h-14 w-full px-5 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition"
          />

          <input
            type="password"
            placeholder="Password"
            className="h-14 w-full px-5 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition"
          />

        </div>

        {/* Button */}
        <button className="w-full h-14 mt-8 rounded-full bg-[#11231e] text-white text-lg font-semibold hover:bg-[#1b3a33] transition duration-300">
          Continue
        </button>

        {/* Login */}
        <p className="mt-8 text-center text-[#666]">
          Already have an account?{" "}
          <span className="text-[#11231e] font-semibold cursor-pointer hover:underline">
            Login Here
          </span>
        </p>

        {/* Checkbox */}
        <div className="flex items-start gap-3 mt-8 text-[#666] text-sm leading-6">

          <input
            type="checkbox"
            className="mt-1 accent-[#11231e]"
          />

          <p>
            By continuing, I agree to the{" "}
            <span className="text-[#11231e] font-medium cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-[#11231e] font-medium cursor-pointer">
              Privacy Policy
            </span>.
          </p>

        </div>

      </div>
    </div>
  );
};

export default LoginSignup;