import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Trash2, ShoppingBag, Tag, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getFinalTotalAmount,
  } = useContext(ShopContext);

  const [promoInput, setPromoInput] = useState("");

  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const finalTotal = getFinalTotalAmount();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyCoupon(promoInput)) {
      setPromoInput("");
    }
  };

  // Empty Cart check
  if (Object.values(cartItems).every((qty) => qty === 0)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag size={90} className="text-[#11231e] mb-6" />

        <h1 className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond'] text-[#11231e]">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-[#666] max-w-md leading-7 text-base sm:text-lg">
          Looks like you haven't added any products to your cart yet. Discover our curated collections!
        </p>

        <Link to="/">
          <button className="mt-8 px-8 py-4 rounded-full bg-[#11231e] text-white hover:bg-[#1b3a33] transition duration-300 cursor-pointer shadow-md">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-['Cormorant_Garamond'] font-bold text-[#11231e] text-center">
        Shopping Cart
      </h1>

      <p className="text-center text-[#666] mt-3 mb-10 sm:mb-14 text-base sm:text-lg">
        Review your selected items & discounts
      </p>

      {/* Table Container with horizontal scroll on small devices */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Header */}
          <div className="grid grid-cols-[110px_2.5fr_1fr_1.2fr_1fr_60px] items-center bg-[#f7e0d3] rounded-2xl px-6 py-4 font-semibold text-[#11231e] shadow-sm">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p className="text-center">Remove</p>
          </div>

          {/* Cart Items */}
          <div className="mt-4 flex flex-col gap-4">
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <div
                    key={e.id}
                    className="grid grid-cols-[110px_2.5fr_1fr_1.2fr_1fr_60px] items-center bg-white rounded-2xl border border-[#ead8cc] px-6 py-4 shadow-sm hover:shadow-md transition"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${e.id}`}>
                      <img
                        src={e.image}
                        alt={e.name}
                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl"
                      />
                    </Link>

                    {/* Product Name */}
                    <div className="pr-4">
                      <Link
                        to={`/product/${e.id}`}
                        className="text-[#11231e] font-medium text-base hover:underline line-clamp-2"
                      >
                        {e.name}
                      </Link>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        Category: {e.category}
                      </p>
                    </div>

                    {/* Price */}
                    <p className="text-lg font-semibold text-[#11231e]">
                      ${e.new_price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(e.id)}
                        className="w-8 h-8 rounded-lg bg-[#FDECE2] border border-[#d8c8bf] hover:bg-[#ead8cc] flex items-center justify-center font-bold text-[#11231e] cursor-pointer"
                      >
                        -
                      </button>

                      <span className="font-semibold text-base w-6 text-center">
                        {cartItems[e.id]}
                      </span>

                      <button
                        onClick={() => increaseQuantity(e.id)}
                        className="w-8 h-8 rounded-lg bg-[#11231e] text-white hover:bg-[#1b3a33] flex items-center justify-center font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Total */}
                    <p className="text-lg font-bold text-[#11231e]">
                      ${(e.new_price * cartItems[e.id]).toFixed(2)}
                    </p>

                    {/* Remove */}
                    <div className="flex justify-center">
                      <Trash2
                        size={20}
                        className="text-red-500 cursor-pointer hover:text-red-700 hover:scale-110 transition-all duration-200"
                        onClick={() => {
                          removeFromCart(e.id);
                          toast.success("Product removed from cart");
                        }}
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* ---------------- Cart Bottom ---------------- */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Promo Code Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ead8cc] shadow-sm order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#11231e] mb-4 flex items-center gap-2">
            <Tag size={24} /> Have a Promo Code?
          </h2>

          <p className="text-[#666] mb-6 leading-6 text-sm sm:text-base">
            Use code <strong className="text-[#11231e] bg-amber-100 px-2 py-0.5 rounded cursor-pointer" onClick={() => setPromoInput("WELCOME15")}>WELCOME15</strong> to get an instant 15% discount on your order!
          </p>

          {coupon ? (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <Check size={20} className="text-emerald-600" />
                <div>
                  <p className="font-semibold text-emerald-800 text-sm">
                    {coupon.code} Applied!
                  </p>
                  <p className="text-xs text-emerald-600">
                    You are saving {coupon.discountPercent}% (${discount.toFixed(2)})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeCoupon}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <X size={16} /> Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex rounded-xl overflow-hidden border border-[#d8c8bf] bg-white shadow-sm">
              <input
                type="text"
                placeholder="Enter promo code (e.g. WELCOME15)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 outline-none text-[#11231e] uppercase tracking-wider text-sm sm:text-base"
              />

              <button
                type="submit"
                className="px-6 sm:px-8 bg-[#11231e] text-white font-medium hover:bg-[#1b3a33] transition cursor-pointer text-sm sm:text-base"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {/* Cart Totals */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ead8cc] shadow-sm order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#11231e] mb-6">
            Cart Totals
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-[#f0e6e0] pb-3 text-base">
              <span className="text-[#555]">Subtotal</span>
              <span className="font-semibold text-[#11231e]">${subtotal.toFixed(2)}</span>
            </div>

            {coupon && (
              <div className="flex justify-between border-b border-[#f0e6e0] pb-3 text-base text-emerald-600 font-medium">
                <span>Discount ({coupon.discountPercent}%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between border-b border-[#f0e6e0] pb-3 text-base">
              <span className="text-[#555]">Shipping Fee</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-xl font-bold text-[#11231e]">Total</span>
              <span className="text-2xl font-bold text-[#11231e]">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout" className="block pt-4">
              <button className="w-full h-14 rounded-full bg-[#11231e] text-white font-semibold text-base sm:text-lg hover:bg-[#1b3a33] transition shadow-md cursor-pointer active:scale-98">
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
