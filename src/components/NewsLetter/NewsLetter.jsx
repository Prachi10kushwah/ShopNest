import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-[#FDECE2] py-16">

      <div className="w-[80%] mx-auto flex flex-col items-center gap-4">

        <h1 className="text-[55px] font-semibold">
          Get Exclusive Offers On Your Email
        </h1>

        <p className="text-[20px] text-[#454545]">
          Subscribe to our Newsletter and stay updated
        </p>

        <div className="flex items-center justify-between bg-white w-[730px] h-[60px] rounded-full border border-[#e3e3e3] mt-5">

          <input
            type="email"
            placeholder="Your Email id"
            className="w-[500px] ml-[30px] text-base text-[#616161] outline-none"
          />

          <button className="w-[210px] h-[60px] bg-[#11231e] text-white rounded-full hover:bg-[#203A35] transition-all duration-300">
            Subscribe
          </button>

        </div>

      </div>

    </div>
  );
};

export default NewsLetter;