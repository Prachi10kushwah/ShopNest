import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/user");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Privacy Policy.");
      return;
    }

    localStorage.setItem("shopnestUser", JSON.stringify(formData));
    localStorage.setItem("isLoggedIn", "true");
    toast.success("Account Created Successfully! Welcome to ShopNest.");
    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("shopnestUser") || "null");

    if (!savedUser) {
      toast.error("No account found with this email. Please create an account first.");
      setIsLogin(false);
      return;
    }

    if (
      savedUser.email.toLowerCase() === formData.email.trim().toLowerCase() &&
      savedUser.password === formData.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      toast.success(`Welcome back, ${savedUser.name}!`);
      navigate("/");
    } else {
      toast.error("Invalid Email or Password. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDECE2] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#11231e] font-medium mb-6 hover:underline"
      >
        <ArrowLeft size={18} /> Back to Store
      </Link>

      <div className="w-full max-w-[540px] bg-white rounded-3xl shadow-xl border border-[#ead8cc] p-8 sm:p-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#11231e] font-['Cormorant_Garamond'] text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {/* Description */}
        <p className="text-center text-[#666] mt-2 text-sm sm:text-base">
          {isLogin
            ? "Log in to manage orders and access your saved wishlist."
            : "Join ShopNest to enjoy member perks, offers, and fast checkout."}
        </p>

        {/* Inputs */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="flex flex-col gap-4 sm:gap-5 mt-8">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ananya Roy"
                className="h-12 w-full px-4 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition text-sm sm:text-base"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="h-12 w-full px-4 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter at least 6 characters"
              className="h-12 w-full px-4 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition text-sm sm:text-base"
            />
          </div>

          {/* Terms Checkbox */}
          {!isLogin && (
            <div className="flex items-start gap-3 mt-2 text-[#666] text-xs sm:text-sm leading-5">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 accent-[#11231e]"
              />
              <label htmlFor="terms">
                By continuing, I agree to ShopNest's{" "}
                <span className="text-[#11231e] font-medium underline cursor-pointer">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-[#11231e] font-medium underline cursor-pointer">
                  Privacy Policy
                </span>.
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-13 mt-4 rounded-full bg-[#11231e] text-white text-base sm:text-lg font-semibold hover:bg-[#1b3a33] transition duration-300 shadow-md cursor-pointer active:scale-98"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle between login & signup */}
        <p className="mt-8 text-center text-[#666] text-sm sm:text-base">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#11231e] font-bold cursor-pointer hover:underline ml-1.5"
          >
            {isLogin ? "Create one now" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
