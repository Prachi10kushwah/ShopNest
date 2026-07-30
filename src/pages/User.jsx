import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Heart, ShoppingCart, UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const { cartItems, wishlistItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("shopnestUser"));

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-5">
        <UserCircle size={80} className="text-gray-400" />

        <h2 className="text-3xl font-semibold text-[#11231e]">
          Please Login
        </h2>

        <p className="text-gray-500">
          Login to view your profile.
        </p>

        <Link
          to="/login"
          className="bg-[#11231e] text-white px-6 py-3 rounded-lg hover:bg-[#1b3a33] transition"
        >
          Login
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
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">

        <div className="flex flex-col items-center">
          <UserCircle
            size={90}
            className="text-[#11231e]"
          />

          <h2 className="text-3xl font-bold mt-4">
            My Profile
          </h2>
        </div>

        <div className="mt-10 space-y-6">

          <div>
            <p className="text-gray-500 text-sm">
              Name
            </p>

            <h3 className="text-xl font-semibold">
              {user?.name || "User"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <h3 className="text-xl font-semibold">
              {user?.email || "Not Available"}
            </h3>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-5 mt-10">

          <div className="border rounded-xl p-6 flex items-center gap-4">
            <Heart className="text-red-500" />

            <div>
              <h4 className="font-semibold">
                Wishlist
              </h4>

              <p className="text-gray-500">
                {wishlistCount} Items
              </p>
            </div>
          </div>

          <div className="border rounded-xl p-6 flex items-center gap-4">
            <ShoppingCart className="text-[#11231e]" />

            <div>
              <h4 className="font-semibold">
                Cart
              </h4>

              <p className="text-gray-500">
                {cartCount} Items
              </p>
            </div>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;