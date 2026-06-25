import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiInfo, FiStar } from "react-icons/fi";
import { HeroSkeleton } from "./LoadingSkeleton";

export default function HeroBanner({ movies = [], loading = false }) {
  const [index, setIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (movies.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
      setImgError(false);
    }, 7000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (loading) return <HeroSkeleton />;
  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <div className="relative w-full h-[62vh] sm:h-[78vh] overflow-hidden rounded-b-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {!imgError ? (
            <img
              src={movie.backdrop}
              alt={movie.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-card to-bg-secondary" />
          )}
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 bg-glow-radial" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-accent-highlight bg-accent-highlight/10 border border-accent-highlight/30 rounded-full">
              Featured
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-text-primary mb-3 leading-tight">
              {movie.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary mb-3 flex-wrap">
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <FiStar className="fill-yellow-400" /> {movie.rating}
              </span>
              <span>{movie.year}</span>
              <span>{movie.genre}</span>
              <span className="px-2 py-0.5 border border-border rounded text-xs">
                {movie.language}
              </span>
            </div>
            <p className="text-text-secondary text-sm sm:text-base line-clamp-3 mb-6">
              {movie.description}
            </p>
            <div className="flex items-center gap-3">
              <Link
                to={`/watch/${movie.id}`}
                className="inline-flex items-center gap-2 bg-white text-bg font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors shadow-glow"
              >
                <FiPlay className="fill-bg" /> Play
              </Link>
              <Link
                to={`/movie/${movie.id}`}
                className="inline-flex items-center gap-2 bg-white/10 text-text-primary font-semibold px-6 py-3 rounded-lg border border-border hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <FiInfo /> More Info
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {movies.length > 1 && (
        <div className="absolute bottom-4 right-5 flex gap-1.5">
          {movies.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              aria-label={`Show featured title ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent-primary" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
