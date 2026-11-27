import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Heart, ShoppingCart, UserCircle, LogOut, Package, ArrowRight, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const { cartItems, wishlistItems, orders, cancelOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("shopnestUser") || "{}");

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-5 px-6 text-center">
        <UserCircle size={80} className="text-gray-400" />

        <h2 className="text-3xl sm:text-4xl font-semibold text-[#11231e]">
          Please Login to View Profile
        </h2>

        <p className="text-gray-500 max-w-sm">
          Access your past orders, manage your wishlist, and keep your shopping details safe.
        </p>

        <Link
          to="/login"
          className="bg-[#11231e] text-white px-8 py-3.5 rounded-full hover:bg-[#1b3a33] transition shadow-md font-medium cursor-pointer"
        >
          Login / Register
        </Link>
      </div>
    );
  }

  const cartCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const wishlistCount = Object.values(wishlistItems).filter(Boolean).length;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-10 mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#FAF6F3] border-2 border-[#11231e] flex items-center justify-center text-[#11231e]">
              <UserCircle size={60} />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#11231e]">
                {user?.name || "Customer"}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                {user?.email || "No email registered"}
              </p>
              <span className="inline-block mt-2 text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider">
                Active Member
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-red-300 text-red-500 hover:bg-red-50 transition cursor-pointer text-sm font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Link
            to="/wishlist"
            className="border border-[#ead8cc] hover:border-[#11231e] rounded-2xl p-5 flex items-center justify-between transition group bg-[#FAF6F3]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#11231e]">Wishlist</h4>
                <p className="text-gray-500 text-sm">{wishlistCount} Saved Items</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            to="/cart"
            className="border border-[#ead8cc] hover:border-[#11231e] rounded-2xl p-5 flex items-center justify-between transition group bg-[#FAF6F3]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-[#11231e]">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#11231e]">Cart</h4>
                <p className="text-gray-500 text-sm">{cartCount} Items in Bag</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition" />
          </Link>

          <div className="border border-[#ead8cc] rounded-2xl p-5 flex items-center justify-between bg-[#FAF6F3]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Package size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#11231e]">Total Orders</h4>
                <p className="text-gray-500 text-sm">{orders.length} Orders Placed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-10">
        <h3 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#11231e] mb-6 flex items-center gap-3">
          <Package size={28} /> My Orders ({orders.length})
        </h3>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-[#FAF6F3] rounded-2xl border border-dashed border-[#ead8cc]">
            <Package size={50} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium text-lg">No orders placed yet.</p>
            <p className="text-gray-400 text-sm mt-1">Discover items and place your first order!</p>
            <Link to="/">
              <button className="mt-5 px-6 py-2.5 rounded-full bg-[#11231e] text-white text-sm font-semibold hover:bg-[#1b3a33] transition cursor-pointer">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border border-[#ead8cc] rounded-2xl p-5 sm:p-6 bg-[#fffdfc] shadow-sm hover:shadow-md transition"
              >
                {/* Order Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 text-sm">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">
                      Order ID
                    </span>
                    <span className="font-bold text-[#11231e] text-base">{order.orderId}</span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">
                      Date
                    </span>
                    <span className="text-gray-700">{order.orderDate}</span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">
                      Payment
                    </span>
                    <span className="text-gray-700">{order.paymentMethod}</span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">
                      Status
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="py-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-18 object-cover rounded-xl border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-[#11231e] text-sm sm:text-base truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs text-gray-500 mt-1">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <span className="font-semibold text-sm text-[#11231e]">
                        ${item.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-sm bg-[#FAF6F3] p-4 rounded-xl mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Delivering to:</p>
                    <p className="text-gray-800 text-xs sm:text-sm font-medium">
                      {order.customer.name} - {order.customer.address}, {order.customer.city} ({order.customer.phone})
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">Total Paid:</span>
                      <strong className="text-lg text-emerald-800 font-bold">
                        ${order.totalAmount.toFixed(2)}
                      </strong>
                    </div>

                    {order.status !== "Cancelled" && (
                      <button
                        onClick={() => cancelOrder(order.orderId)}
                        className="px-4 py-2 border border-red-300 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer flex items-center gap-1"
                      >
                        <XCircle size={14} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
