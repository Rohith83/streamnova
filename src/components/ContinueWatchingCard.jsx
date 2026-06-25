import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import { useState } from "react";

export default function ContinueWatchingCard({ movie, onRemove, className = "" }) {
  const [imgError, setImgError] = useState(false);
  const progress = movie.progress || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25 }}
      className={`relative flex-shrink-0 group ${className}`}
    >
      <Link to={`/watch/${movie.id}`} className="block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-card border border-border shadow-card">
          {!imgError ? (
            <img
              src={movie.backdrop}
              alt={movie.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-bg-secondary text-text-secondary text-xs">
              {movie.title}
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <FiPlay className="fill-bg text-bg" />
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.(movie.id);
            }}
            aria-label={`Remove ${movie.title} from continue watching`}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-primary"
          >
            <FiX size={13} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-accent-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="mt-2 text-sm font-medium text-text-primary truncate">
          {movie.title}
        </p>
        <p className="text-xs text-text-secondary">{progress}% watched</p>
      </Link>
    </motion.div>
  );
}
