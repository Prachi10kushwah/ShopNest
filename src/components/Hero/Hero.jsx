import React from "react";
import heroImg from "../Assets/hero1.png";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

const Hero = () => {
  const scrollToShop = () => {
    const popularSection = document.getElementById("popular");
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-[75vh] lg:h-[80vh] bg-cover bg-bottom bg-no-repeat flex items-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        {/*----------------------------------- Left Content ---------------------*/}
        <div className="w-full md:w-[60%] lg:w-[48%] text-[#11231e]">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm font-semibold mb-4 font-['Poppins'] text-[#255347]">
            New Season Collection
          </p>

          <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl lg:text-7xl font-bold leading-none">
            Live Beautifully.
          </h1>

          <h2 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl lg:text-7xl italic leading-tight mt-1 text-[#255347]">
            Shop Effortlessly.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#4F4F4F] leading-7 font-['Poppins'] max-w-md">
            Curated styles, quality you love, delivered straight to your door with care.
          </p>

          <button
            onClick={scrollToShop}
            className="group mt-8 flex items-center gap-3 rounded-full bg-[#255347] px-8 py-4 text-white transition-all duration-300 hover:bg-[#1A302C] shadow-lg cursor-pointer active:scale-95"
          >
            <span className="font-['Poppins'] font-medium text-base">
              Shop Now
            </span>

            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Badges */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 max-w-md">
            {/* Free shipping */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F4D37A] flex items-center justify-center shadow-xs">
                <Truck size={22} className="text-[#11231e]" />
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-semibold font-['Poppins']">
                Free Shipping
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600">Over $50</p>
            </div>

            {/* Secure payment */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#DCE4CF] flex items-center justify-center shadow-xs">
                <ShieldCheck size={22} className="text-[#11231e]" />
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-semibold font-['Poppins']">
                Secure Pay
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600">100% Protected</p>
            </div>

            {/* Easy Returns */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F6D6D9] flex items-center justify-center shadow-xs">
                <RotateCcw size={22} className="text-[#11231e]" />
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-semibold font-['Poppins']">
                Easy Returns
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600">10-Day Return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
