import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { ShopContext } from "../../Context/ShopContext";
import WishlistBurst from "../WishlistBurst/WishlistBurst";
import toast from "react-hot-toast";

const Item = (props) => {
  const { wishlistItems, toggleWishlist, addToCart } = useContext(ShopContext);
  const [isBursting, setIsBursting] = useState(false);
  const [isCartSquashing, setIsCartSquashing] = useState(false);

  const isFavorited = !!wishlistItems[props.id];

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(props.id);

    if (isFavorited) {
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      // Exaggerated feedback animation trigger
      setIsBursting(true);
      window.dispatchEvent(new CustomEvent("wishlist-burst-event"));

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-in fade-in zoom-in-95" : "animate-out fade-out zoom-out-95"
            } max-w-sm w-full bg-[#11231e] text-white shadow-2xl rounded-2xl p-4 flex items-center gap-3.5 border-2 border-red-400/50 pointer-events-auto`}
          >
            <div className="w-11 h-11 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center text-2xl animate-bounce flex-shrink-0">
              💖
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-red-200">
                Added to Wishlist! ✨
              </h4>
              <p className="text-xs text-gray-300 truncate mt-0.5">
                {props.name} saved to your favorites.
              </p>
            </div>
          </div>
        ),
        { duration: 2400 }
      );

      setTimeout(() => {
        setIsBursting(false);
      }, 900);
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(props.id);
    setIsCartSquashing(true);
    window.dispatchEvent(new CustomEvent("cart-burst-event"));

    toast.success(`Added ${props.name} to cart!`, { icon: "🛍️" });

    setTimeout(() => {
      setIsCartSquashing(false);
    }, 650);
  };

  return (
    <div className={`relative group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${isCartSquashing ? "animate-card-squash" : ""}`}>
      {/* ----------------- Wishlist Button with Exaggerated Animation --------------------- */}
      <div className="absolute top-3 right-3 z-20">
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`relative p-2 rounded-full shadow-md transition-all duration-200 cursor-pointer ${
            isFavorited
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-white/95 text-[#11231e] hover:bg-white hover:scale-110"
          } ${isBursting ? "animate-heart-pop ring-4 ring-red-400/50" : ""}`}
          title={isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            size={18}
            className={`transition-all duration-300 ${
              isBursting ? "scale-125" : ""
            }`}
            fill={isFavorited ? "#ef4444" : "none"}
            color={isFavorited ? "#ef4444" : "#11231e"}
          />
        </button>

        {/* Exaggerated Particles & Shockwave Component */}
        <WishlistBurst active={isBursting} />
      </div>

      {/* --------------- Product Image & Squash/Stretch Quick Add ----------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f4ebe4] shadow-xs">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-[340px] sm:h-[380px] lg:h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Squash and Stretch Quick Add To Cart Button */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-md cursor-pointer select-none transform-gpu ${
            isCartSquashing
              ? "animate-squash-stretch bg-[#255347] text-white opacity-100 ring-4 ring-[#255347]/50 shadow-xl"
              : "bg-[#11231e]/90 hover:bg-[#11231e] text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <ShoppingBag size={16} className={isCartSquashing ? "animate-bounce" : ""} />
          {isCartSquashing ? "Added to Cart! ✨" : "Quick Add"}
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
