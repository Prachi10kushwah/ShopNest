import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { ChevronDown } from "lucide-react";
import Item from "../components/Item/Item";

const ShopCategory = (props) => {
  const { all_product, search, sortOption, setSortOption } =
    useContext(ShopContext);

  // Category + Search Filter
  let filteredProducts = all_product.filter(
    (item) =>
      item.category === props.category &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

    // Sorting
    if (sortOption === "newest") {
      filteredProducts = filteredProducts.filter(
        (item) => item.isNew
      );
    } else if (sortOption === "low-high") {
      filteredProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOption === "high-low") {
      filteredProducts.sort((a, b) => b.new_price - a.new_price);
    }

  return (
    <div className="bg-[#FDECE2] min-h-screen">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-8">
        <p className="text-lg text-[#11231e]">
          <span className="font-semibold">
            Showing {filteredProducts.length}
          </span>{" "}
          product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none w-56 px-5 py-3 rounded-full border border-[#d8c8bf] bg-white text-[#11231e] font-medium outline-none cursor-pointer hover:border-[#11231e] transition"
          >
            <option value="all">All</option>
            <option value="newest">Newest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#11231e]"
          />
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 px-6 py-10">
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
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-3xl font-semibold text-[#11231e]">
            No Products Found
          </h2>

          <p className="mt-3 text-[#666]">
            Try another keyword.
          </p>
        </div>
      )}

      {/* Load More */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center mt-12 pb-20">
          <button className="w-[220px] h-[60px] rounded-full bg-[#11231e] text-white text-lg font-medium hover:bg-[#1a332d] transition-all duration-300">
            Explore More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;