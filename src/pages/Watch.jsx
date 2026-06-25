import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { movies } from "../data/movies";
import VideoPlayer from "../components/VideoPlayer";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";
import { useCallback } from "react";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateContinueWatching } = useWatchlist();

  const movie = movies.find((m) => m.id === Number(id));

  const handleProgress = useCallback(
    (pct) => {
      if (movie) updateContinueWatching(movie, pct);
    },
    [movie, updateContinueWatching]
  );

  if (!movie) {
    return (
      <div className="pt-32 text-center px-4">
        <h1 className="text-2xl text-text-primary mb-3">Title not found</h1>
        <Link to="/browse" className="text-accent-highlight hover:underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  const recommended = movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-20 pb-16 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
      >
        <FiArrowLeft /> Back
      </button>

      <VideoPlayer movie={movie} onProgress={handleProgress} />

      <div className="mt-6">
        <h1 className="font-display text-2xl sm:text-3xl text-text-primary mb-2">
          {movie.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-text-secondary mb-3 flex-wrap">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
          <span>{movie.language}</span>
        </div>
        <p className="text-text-secondary max-w-3xl">{movie.description}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          Recommended
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {recommended.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
