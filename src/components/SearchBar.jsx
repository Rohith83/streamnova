import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search...", autoFocus = false }) {
  const [local, setLocal] = useState(value || "");

  useEffect(() => {
    setLocal(value || "");
  }, [value]);

  const handleChange = (e) => {
    setLocal(e.target.value);
    onChange?.(e.target.value);
  };

  const clear = () => {
    setLocal("");
    onChange?.("");
  };

  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
      <input
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-card border border-border rounded-xl pl-11 pr-10 py-3.5 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight transition-shadow"
      />
      {local && (
        <button
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
}
