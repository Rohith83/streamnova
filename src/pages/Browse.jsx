import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import { GridSkeleton } from "../components/LoadingSkeleton";
import { movies } from "../data/movies";
import { useMovieFilters } from "../hooks/useMovieFilters";
import { useDebounce } from "../hooks/useDebounce";
import { FiFilm } from "react-icons/fi";

export default function Browse() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 250);

  const [filters, setFilters] = useState({
    genre: searchParams.get("genre") || "All",
    year: "All",
    rating: "All",
    language: "All",
    sort: "popular",
    query: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      setFilters((prev) => ({ ...prev, genre: genreParam }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, query: debouncedQuery }));
  }, [debouncedQuery]);

  const filtered = useMovieFilters(movies, filters);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl text-text-primary mb-2">
          Browse Movies
        </h1>
        <p className="text-text-secondary mb-6">
          {movies.length} titles across every genre, mood, and decade.
        </p>

        <div className="mb-6 max-w-xl">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search by title or genre..."
          />
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resultCount={filtered.length}
          />

          <div className="flex-1">
            {loading ? (
              <GridSkeleton count={15} />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<FiFilm />}
                title="No titles match these filters"
                message="Try widening your filters or searching a different keyword."
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {filtered.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
