import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { ChevronDown } from 'lucide-react';
import Item from "../components/Item/Item";


const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="bg-[#FDECE2] min-h-screen ">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-8">
  <p className="text-lg">
    <span className="font-semibold">Showing 1-10</span> out of 50 products
  </p>

  <div className="flex items-center justify-between w-40 px-5 py-2 border border-gray-400 rounded-full cursor-pointer hover:border-black transition-all duration-300">
    <span className="text-[16px] font-medium">Sort By</span>
    <ChevronDown size={16} />
  </div>
</div>
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 px-6 py-10">
      {all_product.map((item,i)=>{
        if(props.category === item.category){
          return <Item key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}/>
        }else{
          return null
        }
      })}
    </div>
    {/* load more button */}
    <div className="flex justify-center mt-12 pb-20">
      <button className="w-[220px] h-[60px] rounded-full bg-[#11231e] text-white text-lg font-medium cursor-pointer hover:bg-[#1a332d] transition-all duration-300">
        Explore More
      </button>
    </div>
    </div>
  )
};

export default ShopCategory;
