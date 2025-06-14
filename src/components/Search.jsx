/** @format */

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300); 

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="w-1/2">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search recipes..."
            className="w-full py-2 px-4 pr-10 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500">
            <FaSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
