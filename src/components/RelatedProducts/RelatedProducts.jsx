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

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#11231e] font-['Cormorant_Garamond']">
          Related Products
        </h1>

        <p className="mt-3 text-[#666] text-lg">
          You may also like these products
        </p>

        <div className="w-28 h-1 bg-[#11231e] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-8 mt-16">
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