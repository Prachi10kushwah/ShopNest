import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import toast from "react-hot-toast";
import { CheckCircle2, CreditCard, Truck, Smartphone, ShieldCheck, ArrowLeft } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    all_product,
    cartItems,
    getTotalCartAmount,
    getDiscountAmount,
    getFinalTotalAmount,
    coupon,
    placeOrder,
  } = useContext(ShopContext);

  // Pre-fill user data if logged in
  const savedUser = JSON.parse(localStorage.getItem("shopnestUser") || "{}");

  const [formData, setFormData] = useState({
    name: savedUser.name || "",
    email: savedUser.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const total = getFinalTotalAmount();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (subtotal === 0) {
      toast.error("Your cart is empty! Add products before checkout.");
      navigate("/cart");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Please provide a valid 10-digit phone number.");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please provide your delivery address.");
      return;
    }

    const order = placeOrder({
      ...formData,
      paymentMethod,
    });

    setOrderSuccess(order);
    toast.success(`Order ${order.orderId} placed successfully!`);
  };

  // If order is completed, show Order Success Screen
  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] bg-[#FDECE2] flex items-center justify-center py-16 px-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-[#ead8cc]">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-['Cormorant_Garamond'] text-[#11231e]">
            Order Confirmed!
          </h1>

          <p className="text-gray-600 mt-2">
            Thank you for shopping with ShopNest. Your order has been placed.
          </p>

          <div className="bg-[#FAF6F3] rounded-2xl p-5 mt-6 text-left border border-[#ead8cc] space-y-2 text-sm sm:text-base">
            <p className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <strong className="text-[#11231e]">{orderSuccess.orderId}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Payment:</span>
              <span className="font-medium text-[#11231e]">{orderSuccess.paymentMethod}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Total Amount:</span>
              <strong className="text-emerald-700 text-lg">${orderSuccess.totalAmount.toFixed(2)}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Delivering to:</span>
              <span className="text-right text-[#11231e] max-w-[260px] truncate">{orderSuccess.customer.address}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/user" className="flex-1">
              <button className="w-full py-3.5 rounded-full bg-[#11231e] text-white font-semibold hover:bg-[#1b3a33] transition cursor-pointer">
                View My Orders
              </button>
            </Link>

            <Link to="/" className="flex-1">
              <button className="w-full py-3.5 rounded-full border-2 border-[#11231e] text-[#11231e] font-semibold hover:bg-[#11231e] hover:text-white transition cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Cart Items list
  const activeCartItems = all_product.filter((p) => cartItems[p.id] > 0);

  return (
    <div className="min-h-screen bg-[#FDECE2] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-[#11231e] font-medium mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="text-4xl sm:text-5xl font-['Cormorant_Garamond'] font-bold text-[#11231e] mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Billing & Shipping Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#11231e]">
              Shipping & Contact Details
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 outline-none focus:border-[#11231e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 outline-none focus:border-[#11231e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Phone Number (10 digits) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 outline-none focus:border-[#11231e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House/Flat No., Street, Landmark"
                  className="w-full border border-[#d9c8be] rounded-xl p-4 outline-none focus:border-[#11231e] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Indore"
                    className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 outline-none focus:border-[#11231e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Postal / PIN Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="452001"
                    className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 outline-none focus:border-[#11231e]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-[#11231e]">
                  Select Payment Method
                </h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod("Cash on Delivery")}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "Cash on Delivery"
                        ? "border-[#11231e] bg-[#FAF6F3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={() => setPaymentMethod("Cash on Delivery")}
                      className="accent-[#11231e]"
                    />
                    <Truck className="text-[#11231e]" size={22} />
                    <div className="flex-1">
                      <span className="font-medium text-[#11231e]">Cash on Delivery (COD)</span>
                      <p className="text-xs text-gray-500">Pay cash upon receiving your package</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("UPI / QR Code")}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "UPI / QR Code"
                        ? "border-[#11231e] bg-[#FAF6F3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "UPI / QR Code"}
                      onChange={() => setPaymentMethod("UPI / QR Code")}
                      className="accent-[#11231e]"
                    />
                    <Smartphone className="text-[#11231e]" size={22} />
                    <div className="flex-1">
                      <span className="font-medium text-[#11231e]">UPI / QR Instant Pay</span>
                      <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("Debit / Credit Card")}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "Debit / Credit Card"
                        ? "border-[#11231e] bg-[#FAF6F3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "Debit / Credit Card"}
                      onChange={() => setPaymentMethod("Debit / Credit Card")}
                      className="accent-[#11231e]"
                    />
                    <CreditCard className="text-[#11231e]" size={22} />
                    <div className="flex-1">
                      <span className="font-medium text-[#11231e]">Debit / Credit Card</span>
                      <p className="text-xs text-gray-500">Visa, MasterCard, RuPay</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 h-14 rounded-full bg-[#11231e] text-white text-lg font-semibold hover:bg-[#1b3a33] transition cursor-pointer shadow-lg active:scale-98"
              >
                Place Order (${total.toFixed(2)})
              </button>
            </form>
          </div>

          {/* Order Summary & Products Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#11231e]">
                Order Summary
              </h2>

              {/* Items Mini List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2 mb-6 border-b border-gray-100 pb-4">
                {activeCartItems.map((prod) => (
                  <div key={prod.id} className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#11231e] truncate">
                        {prod.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {cartItems[prod.id]} × ${prod.new_price}
                      </p>
                    </div>
                    <span className="font-semibold text-sm text-[#11231e]">
                      ${(prod.new_price * cartItems[prod.id]).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#11231e]">${subtotal.toFixed(2)}</span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon ({coupon.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>

                <hr className="my-2 border-gray-200" />

                <div className="flex justify-between text-xl font-bold text-[#11231e]">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 bg-[#FAF6F3] p-3 rounded-xl">
                <ShieldCheck size={18} className="text-[#11231e]" />
                <span>Encrypted checkout. Your personal details are protected.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
