import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrum = (props) => {
  const { product } = props;
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 capitalize px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-[#777]">
      <Link to="/" className="hover:text-[#11231e] transition">
        HOME
      </Link>
      <ChevronRight size={14} className="text-gray-400" />

      <Link to="/" className="hover:text-[#11231e] transition">
        SHOP
      </Link>
      <ChevronRight size={14} className="text-gray-400" />

      <Link
        to={`/${product.category}`}
        className="hover:text-[#11231e] transition capitalize"
      >
        {product.category}
      </Link>
      <ChevronRight size={14} className="text-gray-400" />

      <span className="text-[#11231e] font-semibold truncate max-w-[200px] sm:max-w-md">
        {product.name}
      </span>
    </div>
  );
};

export default Breadcrum;
