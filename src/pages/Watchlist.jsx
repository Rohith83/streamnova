import { motion } from "framer-motion";
import { FiBookmark } from "react-icons/fi";
import MovieCard from "../components/MovieCard";
import EmptyState from "../components/EmptyState";
import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl text-text-primary mb-2">
          My Watchlist
        </h1>
        <p className="text-text-secondary mb-8">
          {watchlist.length} title{watchlist.length !== 1 ? "s" : ""} saved to watch later.
        </p>

        {watchlist.length === 0 ? (
          <EmptyState
            icon={<FiBookmark />}
            title="Your watchlist is empty"
            message="Tap the + on any title to save it here for later."
            actionLabel="Browse Movies"
            actionTo="/browse"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
