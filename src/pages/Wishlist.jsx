import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Item from "../components/Item/Item";

const Wishlist = () => {
  const { all_product, wishlistItems } = useContext(ShopContext);

  const wishlistProducts = all_product.filter(
    (item) => wishlistItems[item.id]
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">

        <Heart
          size={90}
          className="text-red-500 mb-6"
        />

        <h1 className="text-5xl font-bold font-['Cormorant_Garamond'] text-[#11231e]">
          Your Wishlist is Empty
        </h1>

        <p className="mt-4 text-[#666] max-w-md leading-7 text-lg">
          Save your favourite products to view them later.
        </p>

        <Link to="/">
          <button className="mt-8 px-8 py-4 rounded-full bg-[#11231e] text-white hover:bg-[#1b3a33] transition duration-300">
            Explore Products
          </button>
        </Link>

      </div>
    );
  }

  return (
    <div className="bg-[#FDECE2] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold font-['Cormorant_Garamond'] text-center text-[#11231e]">
          My Wishlist
        </h1>

        <p className="text-center text-[#666] mt-3 mb-12">
          Your favourite products
        </p>

        <div className="grid grid-cols-4 gap-8">
          {wishlistProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;