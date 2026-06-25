import { useState } from "react";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import { genres, languages } from "../data/genres";

const years = ["All", 2025, 2024, 2023, 2022, 2021, 2020, 2019];
const ratings = ["All", "8", "7", "6", "5"];
const sorts = [
  { label: "Most Popular", value: "popular" },
  { label: "Latest", value: "latest" },
  { label: "Top Rated", value: "top_rated" },
  { label: "A-Z", value: "az" },
];

function FilterGroup({ label, value, options, onChange, render }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-text-primary mb-3">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const optValue = typeof opt === "object" ? opt.value : opt;
          const optLabel = typeof opt === "object" ? opt.label : opt;
          const active = String(value) === String(optValue);
          return (
            <button
              key={optValue}
              onClick={() => onChange(optValue)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                active
                  ? "bg-accent-primary border-accent-primary text-white"
                  : "border-border text-text-secondary hover:text-text-primary hover:border-white/30"
              }`}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterSidebar({ filters, setFilters, resultCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({
      genre: "All",
      year: "All",
      rating: "All",
      language: "All",
      sort: "popular",
      query: filters.query,
    });

  const content = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
          <FiFilter size={16} /> Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-accent-highlight hover:underline"
        >
          Reset all
        </button>
      </div>

      <FilterGroup
        label="Sort By"
        value={filters.sort}
        options={sorts}
        onChange={(v) => update("sort", v)}
      />
      <FilterGroup
        label="Genre"
        value={filters.genre}
        options={["All", ...genres]}
        onChange={(v) => update("genre", v)}
      />
      <FilterGroup
        label="Release Year"
        value={filters.year}
        options={years}
        onChange={(v) => update("year", v)}
      />
      <FilterGroup
        label="Minimum Rating"
        value={filters.rating}
        options={ratings.map((r) => ({ value: r, label: r === "All" ? "All" : `${r}+` }))}
        onChange={(v) => update("rating", v)}
      />
      <FilterGroup
        label="Language"
        value={filters.language}
        options={["All", ...languages]}
        onChange={(v) => update("language", v)}
      />
    </>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary"
        >
          <FiFilter size={15} /> Filters
          <FiChevronDown size={14} className="text-text-secondary" />
        </button>
      </div>

      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
          {content}
          {typeof resultCount === "number" && (
            <p className="text-xs text-text-secondary pt-4 border-t border-border">
              {resultCount} title{resultCount !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-bg-secondary border-l border-border p-5 overflow-y-auto">
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-4 text-text-secondary hover:text-text-primary"
              aria-label="Close filters"
            >
              <FiX size={22} />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
