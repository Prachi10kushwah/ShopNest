import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Trash2 } from "lucide-react";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
 
const subtotal = all_product.reduce((total, item) => {
  return total + item.new_price * cartItems[item.id];
}, 0);    

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Heading */}
      <h1 className="text-5xl font-['Cormorant_Garamond'] font-bold text-[#11231e] text-center">
        Shopping Cart
      </h1>

      <p className="text-center text-[#666] mt-3 mb-14 text-lg">
        Review your selected items
      </p>

      {/* Header */}
      <div className="grid grid-cols-[130px_2fr_1fr_1fr_1fr_80px] items-center bg-[#FDECE2] rounded-2xl px-8 py-5 font-semibold text-[#11231e] shadow-sm">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Cart Items */}
      <div className="mt-6 flex flex-col gap-6">
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div
                key={e.id}
                className="grid grid-cols-[130px_2fr_1fr_1fr_1fr_80px] items-center bg-white rounded-2xl border border-[#ead8cc] px-8 py-5 shadow-md hover:shadow-lg transition"
              >
                {/* Product Image */}
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-28 h-32 object-cover rounded-xl"
                />

                {/* Product Name */}
                <p className="max-w-[250px] text-[#11231e] font-medium leading-7 text-[17px]">
                  {e.name}
                </p>

                {/* Price */}
                <p className="text-xl font-semibold text-[#11231e]">
                  ${e.new_price}
                </p>

                {/* Quantity */}
                <button className="w-14 h-14 rounded-xl border border-[#d8c8bf] bg-[#FDECE2] font-semibold text-lg hover:border-[#11231e] transition">
                  {cartItems[e.id]}
                </button>

                {/* Total */}
                <p className="text-xl font-bold text-[#11231e]">
                  ${(e.new_price * cartItems[e.id]).toFixed(2)}
                </p>

                {/* Remove */}
                <div className="flex justify-center">
                  <Trash2
                    size={22}
                    className="text-red-500 cursor-pointer hover:text-red-700 hover:scale-125 transition-all duration-300"
                    onClick={() => removeFromCart(e.id)}
                  />
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
      {/* ---------------- Cart Bottom ---------------- */}
<div className="mt-20 grid grid-cols-2 gap-20">

  {/* Cart Totals */}
  <div>
    <h2 className="text-3xl font-bold font-['Cormorant_Garamond'] text-[#11231e] mb-8">
      Cart Totals
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between border-b border-[#d8c8bf] pb-4">
        <span className="text-[#555] text-lg">Subtotal</span>
        <span className="font-semibold text-[#11231e]">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between border-b border-[#d8c8bf] pb-4">
        <span className="text-[#555] text-lg">Shipping Fee</span>
        <span className="font-semibold text-[#11231e]">Free</span>
      </div>

      <div className="flex justify-between pt-2">
        <span className="text-xl font-bold text-[#11231e]">
          Total
        </span>

        <span className="text-2xl font-bold text-[#11231e]">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      <button className="mt-8 w-full h-14 rounded-xl bg-[#11231e] text-white font-semibold text-lg hover:bg-[#1b3a33] transition">
        PROCEED TO CHECKOUT
      </button>

    </div>
  </div>

  {/* Promo Code */}
  <div>

    <h2 className="text-3xl font-bold font-['Cormorant_Garamond'] text-[#11231e] mb-8">
      Promo Code
    </h2>

    <p className="text-[#666] mb-6 leading-7">
      If you have a promo code, enter it below and apply it to your order.
    </p>

    <div className="flex rounded-xl overflow-hidden border border-[#d8c8bf] bg-white shadow-sm">

      <input
        type="text"
        placeholder="Enter promo code"
        className="flex-1 px-5 py-4 outline-none text-[#555]"
      />

      <button className="px-8 bg-[#11231e] text-white font-medium hover:bg-[#1b3a33] transition">
        Apply
      </button>

    </div>

  </div>

</div>
    </div>
  );
};

export default CartItems;