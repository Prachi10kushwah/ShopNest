import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { ShopContext } from "../../Context/ShopContext";
import toast from "react-hot-toast";

const Item = (props) => {
  const { wishlistItems, toggleWishlist, addToCart } = useContext(ShopContext);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(props.id);
    if (wishlistItems[props.id]) {
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      toast.success("Added to wishlist!");
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(props.id);
    toast.success(`Added ${props.name} to cart!`);
  };

  return (
    <div className="relative group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      {/* ----------------- Wishlist Button --------------------- */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
        title="Wishlist"
      >
        <Heart
          size={18}
          fill={wishlistItems[props.id] ? "#ef4444" : "none"}
          color={wishlistItems[props.id] ? "#ef4444" : "#11231e"}
        />
      </button>

      {/* --------------- Product Image & Quick Add ----------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f4ebe4] shadow-xs">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-[340px] sm:h-[380px] lg:h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Quick Add To Cart Hover Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 py-2.5 bg-[#11231e]/90 hover:bg-[#11231e] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 backdrop-blur-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md cursor-pointer"
        >
          <ShoppingBag size={16} /> Quick Add
        </button>
      </div>

      {/* ------------ Product Details -------------- */}
      <div className="mt-3.5 flex flex-col flex-1 justify-between">
        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="text-[15px] sm:text-[16px] font-medium text-[#1F2937] leading-snug hover:text-[#255347] transition line-clamp-2"
        >
          {props.name}
        </Link>

        {/* Price container */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[#111827] text-lg sm:text-xl font-bold">
            ${props.new_price}
          </span>
          {props.old_price && (
            <span className="text-gray-400 text-sm line-through">
              ${props.old_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
