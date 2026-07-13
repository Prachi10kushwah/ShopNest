import React, { useContext } from "react";
import { Star } from "lucide-react";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext)

  return (
    <div className="max-w-7xl mx-auto flex gap-16 py-16 px-6 bg-[#FDECE2]">
      {/*---------------------- Product Display Left ---------------------*/}
      <div className="flex gap-5">
        {/* Image List */}
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt=""
            className="w-20 h-28 object-cover rounded-lg border border-[#e5d5ca] cursor-pointer hover:border-[#11231e] transition"
          />
          <img
            src={product.image}
            alt=""
            className="w-20 h-28 object-cover rounded-lg border border-[#e5d5ca] cursor-pointer hover:border-[#11231e] transition"
          />
          <img
            src={product.image}
            alt=""
            className="w-20 h-28 object-cover rounded-lg border border-[#e5d5ca] cursor-pointer hover:border-[#11231e] transition"
          />
          <img
            src={product.image}
            alt=""
            className="w-20 h-28 object-cover rounded-lg border border-[#e5d5ca] cursor-pointer hover:border-[#11231e] transition"
          />
        </div>

        {/* Main Image */}
        <div>
          <img
            src={product.image}
            alt=""
            className="w-[460px] h-[650px] object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>

      {/*---------------------- Product Display Right ---------------------*/}
      <div className="flex-1 flex flex-col justify-center">
        {/* Product Name */}
        <h1 className="text-[38px] font-semibold text-[#11231e] leading-tight">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-4">
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} color="#D1D5DB" />

          <p className="ml-2 text-[#666] text-lg">(122 Reviews)</p>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-4 mt-6">
          <div className="text-2xl text-gray-400 line-through">
            ${product.old_price}
          </div>

          <div className="text-4xl font-bold text-[#11231e]">
            ${product.new_price}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 text-[17px] leading-8 text-[#555] max-w-[520px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          accusamus necessitatibus vero perspiciatis ad aliquam esse provident
          quibusdam adipisci consectetur suscipit sed quos temporibus ab
          cupiditate. Inventore saepe iure soluta!
        </div>

        {/* Size */}
        <h2 className="mt-8 text-xl font-semibold text-[#11231e]">
          Select Size
        </h2>

        <div className="flex gap-4 mt-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#d8c8bf] bg-white hover:bg-[#11231e] hover:text-white hover:border-[#11231e] transition cursor-pointer">
            S
          </div>

          <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#d8c8bf] bg-white hover:bg-[#11231e] hover:text-white hover:border-[#11231e] transition cursor-pointer">
            M
          </div>

          <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#d8c8bf] bg-white hover:bg-[#11231e] hover:text-white hover:border-[#11231e] transition cursor-pointer">
            L
          </div>

          <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#d8c8bf] bg-white hover:bg-[#11231e] hover:text-white hover:border-[#11231e] transition cursor-pointer">
            XL
          </div>

          <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-[#d8c8bf] bg-white hover:bg-[#11231e] hover:text-white hover:border-[#11231e] transition cursor-pointer">
            XXL
          </div>
        </div>

        {/* Add To Cart */}
        <button onClick={()=>addToCart(product.id)} className="mt-10 w-[300px] h-[60px] rounded-full bg-[#11231e] text-white text-lg font-semibold hover:bg-[#1b3a33] transition duration-300 shadow-lg">
          ADD TO CART
        </button>

        {/* Category & Tags */}
        <div className="mt-8 space-y-3 text-[#555]">
          <p>
            <span className="font-semibold text-[#11231e]">
              Category :
            </span>{" "}
            Women, T-Shirt, Crop Top
          </p>

          <p>
            <span className="font-semibold text-[#11231e]">
              Tags :
            </span>{" "}
            Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;