import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlay, FiPlus, FiCheck, FiStar } from "react-icons/fi";
import { useWatchlist } from "../context/WatchlistContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MovieCard({ movie, className = "" }) {
  const [imgError, setImgError] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const inList = isInWatchlist(movie.id);

  const handleToggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast("Sign in to manage your watchlist.", "info");
      navigate("/login");
      return;
    }
    const added = toggleWatchlist(movie);
    showToast(
      added ? `Added "${movie.title}" to your watchlist.` : `Removed "${movie.title}" from your watchlist.`,
      added ? "success" : "info"
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative flex-shrink-0 group ${className}`}
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border shadow-card">
          {!imgError ? (
            <img
              src={movie.poster}
              alt={movie.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-bg-secondary text-text-secondary p-3 text-center">
              <span className="text-3xl mb-1">🎬</span>
              <span className="text-xs font-medium line-clamp-2">{movie.title}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={handleToggleWatchlist}
            aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-primary"
          >
            {inList ? <FiCheck size={15} /> : <FiPlus size={15} />}
          </button>

          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 text-xs font-semibold text-yellow-400">
            <FiStar size={10} className="fill-yellow-400" />
            {movie.rating}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-white text-bg flex items-center justify-center">
                <FiPlay size={12} className="fill-bg" />
              </span>
              <span className="text-xs text-text-secondary">{movie.year}</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-medium text-text-primary truncate">
            {movie.title}
          </h3>
          <p className="text-xs text-text-secondary">
            {movie.genre} · {movie.year}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
