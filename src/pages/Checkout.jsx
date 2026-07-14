import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  return (
    <div className="min-h-screen bg-[#FDECE2] py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-['Cormorant_Garamond'] font-bold text-[#11231e] mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-2 gap-12">

          {/* Billing Details */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-semibold mb-8 text-[#11231e]">
              Billing Details
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-14 border rounded-xl px-4 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-14 border rounded-xl px-4 outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full h-14 border rounded-xl px-4 outline-none"
              />

              <textarea
                placeholder="Shipping Address"
                className="w-full h-32 border rounded-xl p-4 outline-none resize-none"
              />

            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-semibold mb-8 text-[#11231e]">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalCartAmount()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>${getTotalCartAmount()}</span>
              </div>

              <button className="mt-8 w-full h-14 rounded-full bg-[#11231e] text-white text-lg font-semibold hover:bg-[#1b3a33]">
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;