import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// We define what each option looks like - it needs a value and display text
interface Option {
  value: string;
  label: string;
}

// The props our component needs to work
interface CheckboxDropdownProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  buttonText: string;
}

const MultiSelectDropdown = ({
  options,
  selectedValues,
  onChange,
  buttonText,
}: CheckboxDropdownProps) => {
  // Track if the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Reference to our dropdown element for handling outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When a checkbox is clicked, update the selected values
  const handleToggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* The dropdown button */}
      <button
        type="button"
        className="px-4 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* The dropdown menu with checkboxes */}
      {isOpen && (
        <div className="select-none absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggleOption(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
