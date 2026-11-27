import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import User from "./pages/User";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Footer from "./components/Footer/Footer";
import FlyingArcManager from "./components/FlyingArc/FlyingArcManager";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideFooter = location.pathname === "/login" || isAdminRoute;

  return (
    <div className={isAdminRoute ? "min-h-screen bg-gray-50" : "bg-[#FDECE2] min-h-screen flex flex-col justify-between"}>
      {/* Moving in Arcs Global Overlay */}
      <FlyingArcManager />

      <div>
        {/* Do not show Customer Storefront Navbar on Admin routes */}
        {!isAdminRoute && <Navbar />}

        <Routes>
          {/*---------------------------- Route for Category ----------------------------------*/}
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory category="mens" />} />
          <Route path="/womens" element={<ShopCategory category="womens" />} />
          <Route path="/kids" element={<ShopCategory category="kids" />} />
          <Route path="/watches" element={<ShopCategory category="watches" />} />
          <Route path="/bags" element={<ShopCategory category="bags" />} />

          {/* ---------------------------------- Route for ProductId ---------------------------- */}
          <Route path="/product/:productId" element={<Product />} />

          {/* -----------------------------------Route for Wishlist ------------------------------------- */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/*--------------------------------------Route for Cart --------------------------------- */}
          <Route path="/cart" element={<Cart />} />

          {/*--------------------------------- Route for Login -------------------------------------*/}
          <Route path="/login" element={<LoginSignup />} />

          {/*------------------------------------ Route for User -------------------------------------*/}
          <Route path="/user" element={<User />} />

          {/* ----------------------------------- Checkout --------------------------------------------------- */}
          <Route path="/checkout" element={<Checkout />} />

          {/* ----------------------------------- Live Order Tracking ----------------------------------------- */}
          <Route path="/track-order" element={<TrackOrder />} />

          {/* ----------------------------------- FAQs -------------------------------------------------------- */}
          <Route path="/faq" element={<FAQ />} />

          {/* ----------------------------------- Contact Us -------------------------------------------------- */}
          <Route path="/contact" element={<Contact />} />

          {/* ----------------------------------- Dedicated Admin Portal --------------------------------------- */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
