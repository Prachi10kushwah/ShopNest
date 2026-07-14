import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    localStorage.setItem("shopnestUser", JSON.stringify(formData));
    localStorage.setItem("isLoggedIn", "true");
    alert("Account Created Successfully!");
    navigate("/");
    
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleLogin = () => {
  const savedUser = JSON.parse(localStorage.getItem("shopnestUser"));

  if (!savedUser) {
    alert("No account found. Please create an account first.");
    return;
  }

  if (
    savedUser.email === formData.email &&
    savedUser.password === formData.password
  ) {
    localStorage.setItem("isLoggedIn", "true");

    alert(`Welcome back, ${savedUser.name}!`);

    navigate("/");
  } else {
    alert("Invalid Email or Password");
  }
};


  return (
    <div className="w-full min-h-screen bg-[#FDECE2] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[580px] bg-white rounded-3xl shadow-xl border border-[#ead8cc] p-12">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#11231e] font-['Cormorant_Garamond'] text-center">
          {isLogin ? "Login" : "Create Account"}
        </h1>
        
        {/* description */}
        <p className="text-center text-[#666] mt-3">
          {isLogin
            ? "Welcome back to ShopNest."
            : "Join ShopNest and discover timeless fashion."}
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-6 mt-10">

          {!isLogin && (
            <input
               type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="h-14 w-full px-5 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition"
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="h-14 w-full px-5 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="h-14 w-full px-5 rounded-xl border border-[#d9c8be] bg-[#fffdfc] outline-none focus:border-[#11231e] transition"
          />

        </div>

        {/* Button */}
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="w-full h-14 mt-8 rounded-full bg-[#11231e] text-white text-lg font-semibold hover:bg-[#1b3a33] transition duration-300"
        >
          {isLogin ? "Login" : "Continue"}
        </button>

        {/* Login */}
        <p className="mt-8 text-center text-[#666]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#11231e] font-semibold cursor-pointer hover:underline ml-1"
          >
            {isLogin ? "Create Account" : "Login Here"}
          </span>
        </p>

        {/* Checkbox */}
        <div className="flex items-start gap-3 mt-8 text-[#666] text-sm leading-6">

          <input
            type="checkbox"
            className="mt-1 accent-[#11231e]"
          />

          <p>
            By continuing, I agree to the{" "}
            <span className="text-[#11231e] font-medium cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-[#11231e] font-medium cursor-pointer">
              Privacy Policy
            </span>.
          </p>

        </div>

      </div>
    </div>
  );
};

export default LoginSignup;