import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MovieCard from "./MovieCard";
import { RowSkeleton } from "./LoadingSkeleton";

export default function SectionSlider({ title, movies, loading = false, cardSize = "md" }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const widthClass = cardSize === "lg" ? "w-[180px] sm:w-[220px]" : "w-[140px] sm:w-[180px]";

  if (!loading && (!movies || movies.length === 0)) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3 px-4 sm:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
          {title}
        </h2>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          aria-label={`Scroll ${title} left`}
          className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-bg/80 border border-border items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-primary"
        >
          <FiChevronLeft />
        </button>

        {loading ? (
          <div className="px-4 sm:px-8">
            <RowSkeleton />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-8 pb-2 scroll-px-4"
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className={widthClass} />
            ))}
          </div>
        )}

        <button
          onClick={() => scroll("right")}
          aria-label={`Scroll ${title} right`}
          className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-bg/80 border border-border items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-primary"
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
