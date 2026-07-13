import { Link } from "react-router-dom";
import React from 'react'
import { Heart } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {
  const { wishlistItems, toggleWishlist } = useContext(ShopContext);
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:-translate-y-2">
      {/* ----------------- wishlist --------------------- */}
      <div className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md"
        onClick={(e) => {
        e.preventDefault();
        toggleWishlist(props.id);
        }}
        >
        <Heart size={20}
          fill={wishlistItems[props.id] ? "#ef4444" : "none"}
          color={wishlistItems[props.id] ? "#ef4444" : "#11231e"}
        />
      </div>
      {/* --------------- product image ----------------------------------------------- */}
      <Link to={`/product/${props.id}`}><img  onClick={() => window.scrollTo(0, 0)}
        src={props.image}
        alt={props.name}
        className="w-full h-[430px] object-cover object-top rounded-xl transition-transform duration-300 group-hover:scale-105"
      /></Link>
    {/* ------------ Product name-------------- */}
      <p className="mt-4 text-[17px] font-medium text-[#1F2937] leading-6">
        {props.name}
      </p>
    {/* ---------- Price container ------------- */}
      <div className="flex items-center gap-3 mt-2">
        {/* ------ new price ---------- */}
        <div className="text-[#111827] text-xl font-bold">
          ${props.new_price}
        </div>
        {/* ------ old price --------------- */}
        <div className="text-gray-400 text-base line-through">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;