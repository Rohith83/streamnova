const PREFIX = "streamnova_";

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(PREFIX + key);
    return true;
  } catch {
    return false;
  }
}

export const STORAGE_KEYS = {
  USER: "user",
  USERS: "users",
  WATCHLIST: "watchlist",
  CONTINUE_WATCHING: "continue_watching",
  ACTIVITY: "activity",
};
