import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { ChevronDown, ArrowDown } from "lucide-react";
import Item from "../components/Item/Item";

const ShopCategory = (props) => {
  const { all_product, search, sortOption, setSortOption } =
    useContext(ShopContext);

  const [visibleCount, setVisibleCount] = useState(8);

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleCount(8);
  }, [props.category, search]);

  // Category + Search Filter
  let filteredProducts = all_product.filter(
    (item) =>
      item.category === props.category &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  if (sortOption === "newest") {
    filteredProducts = filteredProducts.filter((item) => item.isNew);
  } else if (sortOption === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.new_price - b.new_price);
  } else if (sortOption === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.new_price - a.new_price);
  }

  const categoryTitles = {
    mens: "Men's Timeless Collection",
    womens: "Women's Elegant Collection",
    kids: "Kids' Comfort & Play Collection",
    watches: "Luxury & Everyday Watches",
    bags: "Handcrafted Bags & Leather Goods",
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-[#FDECE2] min-h-screen">
      {/* Category Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond'] text-[#11231e] capitalize">
          {categoryTitles[props.category] || props.category}
        </h1>
        <p className="text-gray-600 mt-2 text-base">
          Hand-picked styles created for elegance and durability.
        </p>
      </div>

      {/* Top Controls Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-6 border-b border-[#ead8cc]">
        <p className="text-base sm:text-lg text-[#11231e]">
          Showing <span className="font-semibold">{displayedProducts.length}</span> of{" "}
          <span className="font-semibold">{filteredProducts.length}</span> products
        </p>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none w-56 px-5 py-3 rounded-full border border-[#d8c8bf] bg-white text-[#11231e] font-medium outline-none cursor-pointer hover:border-[#11231e] transition shadow-xs"
          >
            <option value="all">Sort: Featured</option>
            <option value="newest">Sort: Newest First</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#11231e]"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 py-10">
          {displayedProducts.map((item) => (
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
          <p className="mt-3 text-[#666]">
            Try searching with another keyword or adjust your filters.
          </p>
        </div>
      )}

      {/* Load More Pagination */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-6 pb-20">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="flex items-center gap-2 px-10 py-4 rounded-full bg-[#11231e] text-white text-base font-semibold hover:bg-[#1a332d] transition-all duration-300 shadow-md cursor-pointer active:scale-95"
          >
            <span>Explore More</span>
            <ArrowDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
