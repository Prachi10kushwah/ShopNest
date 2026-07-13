import React from "react";
import { Tag } from "lucide-react";
import borderImg from "../Assets/border.png"

const Offer = () => {
  return (
    <div className="w-full flex justify-center py-15 bg-cover bg-center bg-no-repeat "
    style={{ backgroundImage: `url(${borderImg})` }}>
      
      <div className="w-[90%] max-w-6xl bg-[#255347] rounded-2xl px-10 py-10 flex items-center justify-between">

        {/*---------------------- Left Side ----------------------------*/}
        <div className="flex items-center gap-6">
          <div className="w-30 h-30 rounded-full bg-[#255347] flex items-center justify-center">
            <Tag size={70} className="text-[#f8faf9]" />
          </div>

          <div className="text-white">
            <p className="uppercase text-sm tracking-widest text-gray-300">
              Exclusive Offer Just For You!
            </p>

            <h1 className="text-5xl font-bold font-['Cormorant_Garamond'] mt-1">
              GET 15% OFF
            </h1>

            <p className="text-xl mt-2">
              On your next order
            </p>
          </div>
        </div>

        {/*-------------------------- Right Side -----------------------------*/}
        <div className="border border-dashed border-gray-400 rounded-xl px-15 py-7 text-center">
          <p className="text-gray-300 text-sm uppercase">
            Use Code:
          </p>

          <h2 className="text-white text-3xl font-bold tracking-wider mt-2">
            WELCOME15
          </h2>

          <p className="text-gray-300 text-sm mt-3">
            Offer valid for the next 7 days only.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Offer;