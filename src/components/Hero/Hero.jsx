import React from "react";
import heroImg from "../Assets/hero1.png";
import { ArrowRight, Truck, ShieldCheck, RotateCcw} from "lucide-react";

const Hero = () => {
  return (
    <div
      className="h-[80vh] bg-cover bg-bottom bg-no-repeat"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="flex h-full items-center px-24">
        {/*----------------------------------- Left Content ---------------------*/}
        <div className="w-[45%] text-[#11231e]">

          <p className="uppercase tracking-[4px] text-sm font-medium mb-6 font-['Poppins']">
            New Season Collection
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-7xl font-bold leading-none">
            Live Beautifully.
          </h1>

          <h2 className="font-['Cormorant_Garamond'] text-7xl italic leading-none mt-2">
            Shop Effortlessly.
          </h2>

          <p className="mt-8 text-lg text-[#4F4F4F] leading-8 font-['Poppins'] w-[80%]">
            Curated styles, quality you love,
            <br />
            delivered to your door.
          </p>

          <button className="group mt-10 flex items-center gap-3 rounded-full bg-[#255347] px-8 py-4 text-white transition-all duration-300 hover:bg-[#1A302C]">
            <span className="font-['Poppins'] font-medium">
              Shop Now
            </span>

            <ArrowRight
              size={22}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          <div className="flex gap-12 mt-12">
            {/*---------------------------------- free shipping -----------------------------------*/}
            <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F4D37A] flex items-center justify-center">
                    <Truck size={24} className="text-[#11231e]"/>
                </div>

                <h3 className="mt-3 font-semibold font-['Poppins'] ">Free Shipping</h3>

                <p>On order over $50</p>
            </div>

            {/*------------------------------ secure payment --------------------------------------*/}
            <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#DCE4CF] flex items-center justify-center">
                    <ShieldCheck size={24} className="text-[#11231e]"/>
                </div>

                <h3 className="mt-3 font-semibold font-['Poppins']">Secure Payment</h3>

                <p>100% Protected</p>
            </div>

            {/*------------------------ Easy Returns --------------------------------------------*/}
            <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F6D6D9] flex items-center justify-center">
                    <RotateCcw size={24} className="text-[#11231e]"/>
                </div>

            <h3 className="mt-3 font-semibold font-['Poppins']">Easy Returns</h3>

            <p>10-Day Return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;