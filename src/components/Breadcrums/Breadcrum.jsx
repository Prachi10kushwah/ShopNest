import React from 'react'
import { ChevronRight } from 'lucide-react';

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className="flex items-center gap-[8px] capitalize px-10 py-5 text-base font-semibold text-[#5e5e5e]" >
  <span>HOME</span>
  <ChevronRight size={16} />
  <span>SHOP</span>
  <ChevronRight size={16} />
  <span>{product.category}</span>
  <ChevronRight size={16} />
  <span>{product.name}</span>
    </div>
  )
}

export default Breadcrum
