import React from "react";
import { Tag, Copy } from "lucide-react";
import borderImg from "../Assets/border.png";
import toast from "react-hot-toast";

const Offer = () => {
  const copyCoupon = () => {
    navigator.clipboard?.writeText("WELCOME15");
    toast.success("Coupon code WELCOME15 copied! Apply it in your cart.");
  };

  return (
    <div
      className="w-full flex justify-center py-12 px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${borderImg})` }}
    >
      <div className="w-full max-w-6xl bg-[#255347] rounded-3xl px-6 sm:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl text-center md:text-left">
        {/*---------------------- Left Side ----------------------------*/}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1e443a] flex items-center justify-center flex-shrink-0 shadow-inner">
            <Tag size={44} className="text-[#f8faf9]" />
          </div>

          <div className="text-white">
            <p className="uppercase text-xs sm:text-sm tracking-widest text-emerald-200 font-medium">
              Exclusive Offer Just For You!
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond'] mt-1">
              GET 15% OFF
            </h2>

            <p className="text-lg sm:text-xl text-gray-200 mt-1">
              On your complete order today
            </p>
          </div>
        </div>

        {/*-------------------------- Right Side -----------------------------*/}
        <div
          onClick={copyCoupon}
          className="border-2 border-dashed border-emerald-300/60 rounded-2xl px-8 py-5 text-center cursor-pointer hover:bg-[#1f493e] transition duration-200 group"
          title="Click to copy code"
        >
          <p className="text-emerald-200 text-xs uppercase tracking-wider font-medium">
            Click to Copy Code:
          </p>

          <div className="flex items-center justify-center gap-2 mt-1">
            <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-widest font-mono">
              WELCOME15
            </h3>
            <Copy size={18} className="text-emerald-300 group-hover:scale-110 transition" />
          </div>

          <p className="text-emerald-200 text-xs mt-2">
            Apply at checkout for instant savings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
