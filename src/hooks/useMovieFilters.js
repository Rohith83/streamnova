import { useMemo } from "react";

export function useMovieFilters(movies, filters) {
  return useMemo(() => {
    let result = [...movies];
    const { genre, year, rating, language, sort, query } = filters;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (genre && genre !== "All") {
      result = result.filter((m) => m.genres.includes(genre));
    }

    if (year && year !== "All") {
      result = result.filter((m) => String(m.year) === String(year));
    }

    if (rating && rating !== "All") {
      const minRating = parseFloat(rating);
      result = result.filter((m) => m.rating >= minRating);
    }

    if (language && language !== "All") {
      result = result.filter((m) => m.language === language);
    }

    if (sort === "latest") {
      result.sort((a, b) => b.year - a.year);
    } else if (sort === "top_rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    } else if (sort === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [movies, filters]);
}
