import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/Item/Item";

const Wishlist = () => {
  const { all_product, wishlistItems } = useContext(ShopContext);

  const wishlistProducts = all_product.filter(
    (item) => wishlistItems[item.id]
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#11231e] text-center font-['Cormorant_Garamond']">
        My Wishlist
      </h1>

      <p className="text-center text-[#666] mt-3">
        Your favourite products
      </p>

      <div className="w-24 h-1 bg-[#11231e] mx-auto mt-4 rounded-full"></div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-[#11231e]">
            Your Wishlist is Empty ❤️
          </h2>

          <p className="mt-3 text-[#666]">
            Add products to your wishlist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 mt-14">
          {wishlistProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;