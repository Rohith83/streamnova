import { createContext, useContext, useState, useCallback } from "react";
import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() =>
    getItem(STORAGE_KEYS.WATCHLIST, [])
  );
  const [continueWatching, setContinueWatching] = useState(() =>
    getItem(STORAGE_KEYS.CONTINUE_WATCHING, [])
  );

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const updated = [...prev, movie];
      setItem(STORAGE_KEYS.WATCHLIST, updated);
      return updated;
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((prev) => {
      const updated = prev.filter((m) => m.id !== movieId);
      setItem(STORAGE_KEYS.WATCHLIST, updated);
      return updated;
    });
  }, []);

  const toggleWatchlist = useCallback(
    (movie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
        return false;
      } else {
        addToWatchlist(movie);
        return true;
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  );

  const updateContinueWatching = useCallback((movie, progress) => {
    setContinueWatching((prev) => {
      const filtered = prev.filter((m) => m.id !== movie.id);
      const updated = [{ ...movie, progress, lastWatched: Date.now() }, ...filtered].slice(
        0,
        12
      );
      setItem(STORAGE_KEYS.CONTINUE_WATCHING, updated);
      return updated;
    });
  }, []);

  const removeFromContinueWatching = useCallback((movieId) => {
    setContinueWatching((prev) => {
      const updated = prev.filter((m) => m.id !== movieId);
      setItem(STORAGE_KEYS.CONTINUE_WATCHING, updated);
      return updated;
    });
  }, []);

  const value = {
    watchlist,
    continueWatching,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    updateContinueWatching,
    removeFromContinueWatching,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
}
