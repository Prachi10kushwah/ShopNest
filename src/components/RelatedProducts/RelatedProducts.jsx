import React, { useContext } from "react";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const RelatedProducts = ({ product }) => {
  const { all_product } = useContext(ShopContext);

  const relatedProducts = all_product.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  if (relatedProducts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 border-t border-[#ead8cc]">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#11231e] font-['Cormorant_Garamond']">
          Related Products
        </h2>

        <p className="mt-2 text-[#666] text-sm sm:text-base">
          Customers who viewed this also loved these
        </p>

        <div className="w-20 h-1 bg-[#11231e] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
        {relatedProducts.slice(0, 4).map((item) => (
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
  );
};

export default RelatedProducts;
