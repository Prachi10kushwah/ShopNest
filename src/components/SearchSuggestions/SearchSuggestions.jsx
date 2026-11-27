import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

const SearchSuggestions = ({ search, setSearch, products }) => {
  if (!search || !search.trim()) return null;

  const filtered = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="absolute left-0 top-full mt-2 w-full sm:w-[380px] bg-white rounded-2xl shadow-xl border border-[#ead8cc] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-3 bg-[#FAF6F3] border-b border-[#f0e6e0] flex items-center justify-between text-xs text-gray-500 font-medium">
        <span className="flex items-center gap-1 text-[#11231e]">
          <Sparkles size={14} className="text-amber-500" /> Suggested Products
        </span>
        <span>{filtered.length} found</span>
      </div>

      {filtered.length > 0 ? (
        <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
          {filtered.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              onClick={() => setSearch("")}
              className="flex items-center gap-3 p-3 hover:bg-[#FDECE2] transition cursor-pointer group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#11231e] truncate group-hover:text-emerald-900">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400 capitalize">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-[#11231e]">
                    ${item.new_price}
                  </span>
                </div>
              </div>

              <ChevronRight
                size={16}
                className="text-gray-400 group-hover:translate-x-1 group-hover:text-[#11231e] transition flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-gray-500">
          No products found for "{search}"
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
