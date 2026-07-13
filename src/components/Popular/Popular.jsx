import React from 'react'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import borderImg from "../Assets/border.png"

const Popular = () => {
  return (
    <div
  className="flex flex-col items-center py-5 bg-no-repeat bg-center"
  style={{
    backgroundImage: `url(${borderImg})`,
    backgroundSize: "100% 100%",
  }}
>

        <p className="font-['Cormorant_Garamond'] text-[15px] text-[#a51d1d]"> TOP PICKS FOR YOU</p>

      <h1 className="font-['Cormorant_Garamond'] text-[#171717] text-[50px] font-semibold ">
        BEST SELLERS 
      </h1>

      <hr className="w-[150px] h-[3px] rounded-[10px] bg-[#252525]" />

    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 mt-[30px]">
        {data_product.map((item, i) => (
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
  )
}

export default Popular