import React, { useContext } from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/Item/Item";

const Shop = () => {
  const { search, all_product } = useContext(ShopContext);

  const filteredProducts = all_product.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#FDECE2] min-h-screen">
      {search.trim() === "" ? (
        <>
          <Hero />
          <Offers />
          <Popular />
          <NewArrivals />
          <NewsLetter />
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-['Cormorant_Garamond'] font-bold text-[#11231e] text-center">
            Search Results
          </h1>

          <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found for
            <span className="font-semibold text-[#11231e]">
              {" "}
              "{search}"
            </span>
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
              {filteredProducts.map((item) => (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
              <h2 className="text-3xl font-semibold text-[#11231e]">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try searching with another keyword or explore our categories from the menu.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
