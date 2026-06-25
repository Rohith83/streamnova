import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { genres, genreImages } from "../data/genres";
import { movies } from "../data/movies";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl text-text-primary mb-2">
          Categories
        </h1>
        <p className="text-text-secondary mb-8">
          Explore our catalog by genre and find your next favorite.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {genres.map((genre, i) => (
            <CategoryCard key={genre} genre={genre} index={i} navigate={navigate} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CategoryCard({ genre, index, navigate }) {
  const [imgError, setImgError] = useState(false);
  const count = movies.filter((m) => m.genres.includes(genre)).length;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => navigate(`/browse?genre=${genre}`)}
      className="relative aspect-[3/2] rounded-xl overflow-hidden group text-left border border-border"
    >
      {!imgError ? (
        <img
          src={genreImages[genre]}
          alt={genre}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-card to-bg-secondary" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
          {genre}
        </h3>
        <p className="text-xs text-text-secondary">{count} titles</p>
      </div>
    </motion.button>
  );
}
