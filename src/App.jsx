import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route } from 'react-router-dom'
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import User from './pages/User';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import { useLocation } from "react-router-dom";
import Wishlist from './pages/Wishlist';


const App = () => {
  const location = useLocation();
  return (
    <div className="bg-[#FDECE2]" >
      <Navbar/>
      <Routes>
        {/*---------------------------- Route for Category ----------------------------------*/}
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory category="mens"/>}/>
        <Route path='/womens' element={<ShopCategory category="womens"/>}/>
        <Route path='/kids' element={<ShopCategory category="kids"/>}/>
        <Route path='/watches' element={<ShopCategory category="watches"/>}/>
        <Route path='/bags' element={<ShopCategory category="bags"/>}/>

        {/* ---------------------------------- Route for ProductId ---------------------------- */}
        <Route path="/product/:productId" element={<Product />} />

        {/* -----------------------------------Route for Wishlist ------------------------------------- */}
        <Route path="/wishlist" element={<Wishlist/>} />

        {/*--------------------------------------Route for Cart --------------------------------- */}
        <Route path='/cart' element={<Cart/>}/>

        {/*--------------------------------- Route for Login -------------------------------------*/}
        <Route path='/login' element={<LoginSignup/>}/>

        {/*------------------------------------ Route for User -------------------------------------*/}
        <Route path='/user' element={<User/>}/>
      </Routes>
      {location.pathname !== "/login" && <Footer />}
  
    </div>
  )
}

export default App
