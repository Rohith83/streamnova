import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import SectionSlider from "../components/SectionSlider";
import ContinueWatchingCard from "../components/ContinueWatchingCard";
import { movies } from "../data/movies";
import { useWatchlist } from "../context/WatchlistContext";
import { useToast } from "../context/ToastContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { continueWatching, removeFromContinueWatching } = useWatchlist();
  const { showToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const featured = movies.filter((m) => m.isFeatured);
  const trending = movies.filter((m) => m.isTrending);
  const popular = [...movies].sort((a, b) => b.rating - a.rating).slice(10, 24);
  const topRated = movies.filter((m) => m.isTopRated);
  const action = movies.filter((m) => m.genres.includes("Action"));
  const comedy = movies.filter((m) => m.genres.includes("Comedy"));
  const thriller = movies.filter((m) => m.genres.includes("Thriller"));
  const scifi = movies.filter((m) => m.genres.includes("Sci-Fi"));
  const recentlyAdded = [...movies].sort((a, b) => b.year - a.year).slice(0, 16);

  const handleRemoveContinue = (id) => {
    removeFromContinueWatching(id);
    showToast("Removed from Continue Watching.", "info");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroBanner movies={featured} loading={loading} />

      <div className="pt-10 pb-10">
        {continueWatching.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-3 px-4 sm:px-8">
              <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
                Continue Watching
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-8 pb-2">
              {continueWatching.map((movie) => (
                <ContinueWatchingCard
                  key={movie.id}
                  movie={movie}
                  onRemove={handleRemoveContinue}
                  className="w-[220px] sm:w-[260px]"
                />
              ))}
            </div>
          </section>
        )}
        <SectionSlider title="Trending Now" movies={trending} loading={loading} cardSize="lg" />
        <SectionSlider title="Popular Movies" movies={popular} loading={loading} />
        <SectionSlider title="Top Rated" movies={topRated} loading={loading} />
        <SectionSlider title="Action" movies={action} loading={loading} />
        <SectionSlider title="Comedy" movies={comedy} loading={loading} />
        <SectionSlider title="Thriller" movies={thriller} loading={loading} />
        <SectionSlider title="Sci-Fi" movies={scifi} loading={loading} />
        <SectionSlider title="Recently Added" movies={recentlyAdded} loading={loading} />
      </div>
    </motion.div>
  );
}
