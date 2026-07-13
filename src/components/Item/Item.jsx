import { Link } from "react-router-dom";
import React from 'react'

const Item = (props) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
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