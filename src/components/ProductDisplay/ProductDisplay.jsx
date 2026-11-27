import React, { useContext, useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import { ShopContext } from "../../Context/ShopContext";
import WishlistBurst from "../WishlistBurst/WishlistBurst";
import toast from "react-hot-toast";

const ProductDisplay = ({ product }) => {
  const {
    addToCart,
    wishlistItems,
    toggleWishlist,
  } = useContext(ShopContext);

  const isAccessory = product.category === "watches" || product.category === "bags";
  const sizeOptions = isAccessory ? ["One Size", "Standard"] : ["S", "M", "L", "XL", "XXL"];

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isBursting, setIsBursting] = useState(false);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSize(isAccessory ? "One Size" : "M");
  }, [product, isAccessory]);

  // Gallery images (preview angles)
  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const isFavorited = !!wishlistItems[product.id];

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);

    if (isFavorited) {
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      // Exaggerated feedback animation trigger
      setIsBursting(true);
      window.dispatchEvent(new CustomEvent("wishlist-burst-event"));

      // Animated celebratory toast
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
                {product.name} saved to your favorites.
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

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 py-12 lg:py-16 px-6 bg-[#FDECE2]">
      {/*---------------------- Product Display Left ---------------------*/}
      <div className="flex gap-4 sm:gap-5 justify-center">
        {/* Image List */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} view ${index + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-20 sm:w-20 sm:h-28 object-cover rounded-lg border-2 cursor-pointer transition ${
                selectedImage === img
                  ? "border-[#11231e] shadow-sm scale-105"
                  : "border-[#e5d5ca] hover:border-[#11231e]"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 max-w-[460px]">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[400px] sm:h-[550px] lg:h-[620px] object-cover rounded-2xl shadow-md transition-all duration-300"
          />
        </div>
      </div>

      {/*---------------------- Product Display Right ---------------------*/}
      <div className="flex-1 flex flex-col justify-center">
        {/* Product Name */}
        <h1 className="text-3xl sm:text-[38px] font-semibold text-[#11231e] leading-tight">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-4">
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} fill="#FBBF24" color="#FBBF24" />
          <Star size={18} color="#D1D5DB" />

          <p className="ml-2 text-[#666] text-sm sm:text-base">(122 Reviews)</p>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-4 mt-6">
          <div className="text-2xl text-gray-400 line-through">
            ${product.old_price}
          </div>

          <div className="text-3xl sm:text-4xl font-bold text-[#11231e]">
            ${product.new_price}
          </div>

          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            In Stock
          </span>
        </div>

        {/* Description */}
        <div className="mt-6 text-[16px] sm:text-[17px] leading-7 sm:leading-8 text-[#555] max-w-[520px]">
          Elevate your daily style with this premium quality {product.name.toLowerCase()}. Crafted with meticulous attention to detail, durable materials, and maximum comfort tailored for modern lifestyle.
        </div>

        {/* Size */}
        <div className="mt-8">
          <div className="flex items-center justify-between max-w-[360px]">
            <h2 className="text-lg font-semibold text-[#11231e]">
              Select {isAccessory ? "Option" : "Size"}
            </h2>
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Selected: <strong className="text-[#11231e]">{selectedSize}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-3 rounded-xl border text-sm sm:text-base font-medium transition cursor-pointer ${
                  selectedSize === size
                    ? "bg-[#11231e] text-white border-[#11231e] shadow-md"
                    : "border-[#d8c8bf] bg-white text-[#11231e] hover:border-[#11231e]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 items-center">
          <button
            onClick={() => {
              addToCart(product.id);
              toast.success(`Added ${product.name} to cart!`);
            }}
            className="w-full sm:w-[260px] h-[55px] rounded-full bg-[#11231e] text-white text-base sm:text-lg font-semibold hover:bg-[#1b3a33] transition duration-300 shadow-lg cursor-pointer active:scale-95"
          >
            ADD TO CART
          </button>

          {/* Exaggerated Wishlist Button */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={handleWishlistToggle}
              className={`w-full sm:w-[220px] h-[55px] rounded-full flex items-center justify-center gap-2 text-base sm:text-lg font-semibold transition-all duration-300 shadow-sm cursor-pointer relative overflow-visible ${
                isFavorited
                  ? "bg-red-500 text-white hover:bg-red-600 shadow-red-200"
                  : "border-2 border-red-400 text-red-500 bg-white hover:bg-red-500 hover:text-white"
              } ${isBursting ? "animate-heart-pop ring-4 ring-red-400" : ""}`}
            >
              <Heart
                size={20}
                className={isBursting ? "animate-heart-pop" : ""}
                fill={isFavorited ? "currentColor" : "none"}
              />
              {isFavorited ? "Wishlisted" : "Add to Wishlist"}
            </button>

            {/* Particle Burst Overlay */}
            <WishlistBurst active={isBursting} />
          </div>
        </div>

        {/* Category & Tags */}
        <div className="mt-8 space-y-2 text-[#555] text-sm sm:text-base">
          <p>
            <span className="font-semibold text-[#11231e]">Category :</span>{" "}
            <span className="capitalize">{product.category}</span>
          </p>

          <p>
            <span className="font-semibold text-[#11231e]">Tags :</span> Modern, Premium, Timeless Style
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
