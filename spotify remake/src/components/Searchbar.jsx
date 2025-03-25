import React from "react";

const Searchbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form id="search-form" className="w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          id="search-field"
          placeholder="What do you want to play?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 text-white bg-gray-800 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 shadow-md"
        />
      </div>
    </form>
  );
};

export default Searchbar;
