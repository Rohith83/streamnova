import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiPlus,
  FiCheck,
  FiStar,
  FiClock,
  FiCalendar,
  FiGlobe,
  FiFilm,
} from "react-icons/fi";
import { movies } from "../data/movies";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import SectionSlider from "../components/SectionSlider";
import { DetailsSkeleton } from "../components/LoadingSkeleton";
import { formatDuration } from "../utils/helpers";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const movie = movies.find((m) => m.id === Number(id));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <DetailsSkeleton />;

  if (!movie) {
    return (
      <div className="pt-32 text-center px-4">
        <h1 className="text-2xl text-text-primary mb-3">Title not found</h1>
        <p className="text-text-secondary mb-6">
          This movie may have been removed from our catalog.
        </p>
        <Link to="/browse">
          <Button>Back to Browse</Button>
        </Link>
      </div>
    );
  }

  const inList = isInWatchlist(movie.id);
  const recommended = movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 12);

  const handleWatchlist = () => {
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="relative w-full h-[42vh] sm:h-[55vh] overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.opacity = "0";
          }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-24 sm:-mt-32 relative z-10 pb-16">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-40 sm:w-56 rounded-xl border border-border shadow-card flex-shrink-0 self-center sm:self-start"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          <div className="flex-1">
            <h1 className="font-display text-3xl sm:text-5xl text-text-primary mb-3">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-secondary mb-4 flex-wrap">
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <FiStar className="fill-yellow-400" /> {movie.rating}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar size={14} /> {movie.year}
              </span>
              <span className="flex items-center gap-1">
                <FiClock size={14} /> {formatDuration(movie.duration)}
              </span>
              <span className="flex items-center gap-1">
                <FiGlobe size={14} /> {movie.language}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 text-xs font-medium border border-border rounded-full text-text-secondary"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
              {movie.description}
            </p>

            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <Link to={`/watch/${movie.id}`}>
                <Button variant="primary" size="lg" icon={<FiPlay className="fill-white" />}>
                  Play
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                icon={inList ? <FiCheck /> : <FiPlus />}
                onClick={handleWatchlist}
              >
                {inList ? "In Watchlist" : "Add to Watchlist"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<FiFilm />}
                onClick={() => showToast("Trailer playback isn't available in this demo.", "info")}
              >
                Trailer
              </Button>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Cast</h3>
              <p className="text-sm text-text-secondary">{movie.cast.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <SectionSlider title="More Like This" movies={recommended} />
        </div>
      </div>
    </motion.div>
  );
}
