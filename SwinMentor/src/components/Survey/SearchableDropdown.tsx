import React, { useState } from "react";

interface SearchableDropdownProps {
  options: string[]; //Simply takes as a string this time to increase reusability
  selectedOptions: string[];
  onSelect: (value: string) => void;
  isMultiSelect?: boolean; //To make this component reusable again
  placeholder?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({options, selectedOptions, onSelect, isMultiSelect = false, placeholder = "Search..."}) => {
  
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    //Takes the list, and filters in terms of search Query
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    // Main Div
    <div className="relative w-full">

      {/* Input Field for Search */}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      {/* Show the list if IsOpen is true */}
      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
          {filteredOptions.slice(0, 5).map((option) => (
            <li
              key={option}
              className="p-3 cursor-pointer hover:bg-red-100 transition"
              onClick={() => {
                setSearchTerm("")
                onSelect(option); //Send this back to parent to handle along with the selected item
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Additional code to handle Multiple Selections (like Units) */}
      {isMultiSelect && (
        <div className="flex flex-wrap mt-2">

            {/* To Show the Selected units on the bottom */}
          {selectedOptions.map((selected) => (
            <span
              key={selected}
              className="bg-red-500 text-white px-3 py-1 rounded-full m-1 cursor-pointer"
              onClick={() => {onSelect(selected); setSearchTerm("")}} //This is sent back to parent again
            >
              {selected} ✖
            </span>
          ))}

        </div>
      )}


    </div>
  );
};
