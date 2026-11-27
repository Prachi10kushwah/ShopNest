import React, { useContext, useState } from "react";
import logo from "../Assets/logo.png";
import { ShoppingCart, CircleUserRound, Heart, Search, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import toast from "react-hot-toast";

const Navbar = () => {
  const { all_product, cartItems, wishlistItems, search, setSearch } = useContext(ShopContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );
  const wishlistCount = Object.values(wishlistItems).filter(Boolean).length;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("shopnestUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged Out Successfully!");
    window.location.reload();
  };

  const navLinks = [
    { name: "All", path: "/" },
    { name: "Men", path: "/mens" },
    { name: "Women", path: "/womens" },
    { name: "Kids", path: "/kids" },
    { name: "Watches", path: "/watches" },
    { name: "Bags", path: "/bags" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#FDECE2]/95 backdrop-blur-md shadow-sm border-b border-[#ebd7cb]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3.5">
        {/*--------------------------- Logo -------------------------*/}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="ShopNest Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full shadow-sm"
          />
          <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-[#11231e] tracking-tight">
            ShopNest
          </h1>
        </Link>

        {/*------------------- Desktop Menu ------------------------- */}
        <ul className="hidden lg:flex items-center gap-10 font-medium font-['Poppins'] text-base text-[#11231e]">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <li key={link.path} className="relative py-1">
                <Link
                  to={link.path}
                  className={`transition-colors duration-200 hover:text-[#255347] ${
                    active ? "font-semibold text-[#11231e]" : "text-[#4b5563]"
                  }`}
                >
                  {link.name}
                </Link>
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] rounded-full bg-[#11231e] animate-in fade-in duration-200" />
                )}
              </li>
            );
          })}
        </ul>

        {/*-------------------------- Search Bar & Dropdown -------------------------------------------*/}
        <div className="relative hidden md:block w-[240px] lg:w-[300px]">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-full border border-[#d7c8bf] bg-white pl-10 pr-9 text-sm text-[#11231e] outline-none focus:border-[#11231e] transition shadow-2xs"
          />

          {search && (
            <X
              size={16}
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-red-500"
            />
          )}

          {/* Live Search Suggestions Dropdown */}
          <SearchSuggestions
            search={search}
            setSearch={setSearch}
            products={all_product}
          />
        </div>

        {/*---------------- Right Actions (Icons + Login) ----------------*/}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-1.5 rounded-full hover:bg-[#FAF6F3] transition"
            title="Wishlist"
          >
            <Heart size={24} className="text-[#11231e]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center animate-in zoom-in duration-200">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-1.5 rounded-full hover:bg-[#FAF6F3] transition cursor-pointer"
            title="Cart"
          >
            <ShoppingCart size={24} className="text-[#11231e]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold animate-in zoom-in duration-200">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account / Dropdown */}
          <div className="relative group">
            <Link
              to={isLoggedIn ? "/user" : "/login"}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#FAF6F3] transition text-[#11231e]"
            >
              <CircleUserRound size={26} />
              {isLoggedIn && (
                <span className="hidden xl:inline text-sm font-medium max-w-[90px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-[#ead8cc] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-[#11231e] truncate">{user?.name}</p>
                </div>

                <Link
                  to="/user"
                  className="block px-4 py-2.5 hover:bg-[#FAF6F3] text-sm text-[#11231e]"
                >
                  My Profile & Orders
                </Link>

                <Link
                  to="/wishlist"
                  className="block px-4 py-2.5 hover:bg-[#FAF6F3] text-sm text-[#11231e]"
                >
                  My Wishlist
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <button className="border border-[#11231e] px-4 py-1.5 rounded-full font-['Poppins'] text-sm font-medium text-[#11231e] hover:bg-[#11231e] hover:text-white active:scale-95 transition cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#11231e] rounded-lg hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Search & Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F3] border-t border-[#ead8cc] px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 rounded-xl border border-[#d7c8bf] bg-white pl-10 pr-9 text-sm text-[#11231e] outline-none"
            />
            {search && (
              <X
                size={16}
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-red-500"
              />
            )}
            <SearchSuggestions
              search={search}
              setSearch={setSearch}
              products={all_product}
            />
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-3 font-['Poppins'] font-medium text-[#11231e] pt-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg transition ${
                    isActive(link.path)
                      ? "bg-[#11231e] text-white"
                      : "hover:bg-white text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
