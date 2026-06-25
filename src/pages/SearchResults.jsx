import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import { GridSkeleton } from "../components/LoadingSkeleton";
import { movies } from "../data/movies";
import { useDebounce } from "../hooks/useDebounce";

const trendingSearches = [
  "Sci-Fi", "Crimson Horizon", "Thriller", "2024", "Comedy", "Top Rated", "Korean",
];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebounce(query, 250);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase();
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q)) ||
        String(m.year).includes(q) ||
        m.language.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  const handleSuggestionClick = (term) => {
    setQuery(term);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl text-text-primary mb-6">
          Search
        </h1>

        <div className="max-w-xl mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search by title, genre, year, or language..."
            autoFocus
          />
        </div>

        {!debouncedQuery.trim() ? (
          <TrendingSuggestions onSelect={handleSuggestionClick} />
        ) : loading ? (
          <GridSkeleton count={10} />
        ) : results.length === 0 ? (
          <>
            <EmptyState
              icon={<FiSearch />}
              title={`No results for "${debouncedQuery}"`}
              message="Check the spelling, try a broader term, or explore a trending search below."
            />
            <TrendingSuggestions onSelect={handleSuggestionClick} />
          </>
        ) : (
          <>
            <p className="text-text-secondary mb-5 text-sm">
              {results.length} result{results.length !== 1 ? "s" : ""} for "{debouncedQuery}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function TrendingSuggestions({ onSelect }) {
  return (
    <div className="max-w-xl">
      <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
        Trending Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {trendingSearches.map((term) => (
          <button
            key={term}
            onClick={() => onSelect(term)}
            className="px-4 py-2 text-sm bg-card border border-border rounded-full text-text-secondary hover:text-text-primary hover:border-white/30 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
