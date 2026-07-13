import React, {useContext, useState } from 'react'
import logo from '../Assets/logo.png'
import { ShoppingCart } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);


  const cartCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const [menu, setMenu] = useState("shop")
  return (
    //--------------------------- Logo -------------------------
    <div className="flex items-center justify-between px-8 py-4 shadow  bg-[#FDECE2]">

      <div className="flex items-center gap-2">
        <img src={logo} alt="ShopNest Logo" className="w-12 h-12 object-contain rounded-full"/>
        <h1 className="text-2xl font-bold font-['Poppins'] text-[#11231e]">
          ShopNest
        </h1>
      </div>

      {/*------------------- Menu ------------------------- */}

      <ul className="flex gap-20 font-medium  font-['Poppins'] text-lg text-[#11231e]">
        <li onClick={()=>{setMenu("all")}} className='cursor-pointer'><Link to="/">All</Link> {menu === "all" && (
    <hr className="border-0 w-4/5 h-[3px] rounded-full bg-gray-500 mx-auto mt-1" />
  )}</li>
        <li onClick={()=>{setMenu("mens")}} className='cursor-pointer'><Link to="/mens">Men</Link>{menu === "mens" && (
    <hr className="border-0 w-4/5 h-[3px] rounded-full bg-gray-500 mx-auto mt-1" />
  )}</li>
        <li onClick={()=>{setMenu("womens")}} className='cursor-pointer'><Link to="/womens">Women</Link>{menu === "womens" && (
    <hr className="border-0 w-4/5 h-[3px] rounded-full bg-gray-500 mx-auto mt-1" />
  )}</li>
        <li onClick={()=>{setMenu("kids")}} className='cursor-pointer'><Link to="/kids">Kids</Link>{menu === "kids" && (
    <hr className="border-0 w-4/5 h-[3px] rounded-full bg-gray-500 mx-auto mt-1" />
  )}</li>
        <li onClick={()=>{setMenu("watches")}} className='cursor-pointer'><Link to="/watches">Watches</Link>{menu === "watches" && (
    <hr className="border-0 w-4/5 h-[3px] rounded-full bg-gray-500 mx-auto mt-1" />
  )}</li>
        <li onClick={()=>{setMenu("bags")}} className='cursor-pointer'><Link to="/bags">Bags</Link>{menu === "bags" && (
    <hr className="border-0 w-4/5 h-[3px] rounded-full bg-gray-500 mx-auto mt-1" />
  )}</li>
      </ul>

      <div className='flex items-center gap-10'>
        {/*---------------------------------Button ---------------------------------------- */}
        <Link to="/login"><button className="border px-3 py-1 rounded-lg font-['Poppins'] cursor-pointer hover:shadow-lg active:scale-95 transition-all duration-200 text-[#11231e]">
          Login
        </button></Link>

        {/*------------------------------ Cart ----------------------------------------------*/}
        <Link to="/cart" className="relative cursor-pointer">
        <ShoppingCart size={28} className="mt-1 cursor-pointer text-[#11231e]"  />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold">
            {cartCount}
          </span>
        )}

        </Link>
        {/*---------------------------- User -------------------------------------------------*/}
      <Link to="/user">
      <CircleUserRound size={28} className='flex items-center justify-center rounded-full text-[#11231e]'/>
      </Link>
      </div>
    </div>
  )
}

export default Navbar
