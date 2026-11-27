import React, { useContext } from "react";
import borderImg from "../Assets/border.png";
import Item from "../Item/Item";
import newData_product from "../Assets/newData";
import { ShopContext } from "../../Context/ShopContext";

const NewArrivals = () => {
  const { search } = useContext(ShopContext);

  const filtered = newData_product.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      className="flex flex-col items-center py-12 px-4 sm:px-6 bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${borderImg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <p className="font-['Cormorant_Garamond'] text-sm sm:text-[15px] font-semibold text-[#a51d1d] uppercase tracking-wider">
        CHECK OUT WHAT'S NEW
      </p>

      <h2 className="font-['Cormorant_Garamond'] text-[#171717] text-3xl sm:text-5xl font-bold mt-1 text-center">
        NEW ARRIVALS
      </h2>

      <div className="w-24 sm:w-[150px] h-[3px] rounded-[10px] bg-[#252525] mt-3" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filtered.map((item) => (
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
    </section>
  );
};

export default NewArrivals;
