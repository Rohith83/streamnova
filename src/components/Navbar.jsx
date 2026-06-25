import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiBookmark,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";
import logo from "../../public/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Browse", to: "/browse" },
  { label: "Categories", to: "/categories" },
  { label: "Plans", to: "/subscription" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur-md border-b border-border" : "bg-gradient-to-b from-bg/80 to-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-4 sm:px-8 h-16">
        <div className="flex items-center gap-8">
         <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="StreamNova"
          className="w-40 md:w-48 lg:w-52 h-auto"
          />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-text-primary ${
                  location.pathname === link.to
                    ? "text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <AnimatePresence>
              {searchOpen ? (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearch}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies, genres..."
                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight"
                  />
                </motion.form>
              ) : null}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Toggle search"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
          >
            {searchOpen ? <FiX /> : <FiSearch />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-1.5 group"
                aria-label="Open profile menu"
              >
                <div className="w-8 h-8 rounded-md bg-accent-secondary flex items-center justify-center text-xs font-bold text-white">
                  {getInitials(user?.name || "U")}
                </div>
                <FiChevronDown
                  size={14}
                  className={`text-text-secondary transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-52 bg-card border border-border rounded-xl shadow-card overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors"
                    >
                      <FiUser size={15} /> Profile
                    </Link>
                    <Link
                      to="/watchlist"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors"
                    >
                      <FiBookmark size={15} /> Watchlist
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent-primary hover:bg-white/5 transition-colors"
                    >
                      <FiLogOut size={15} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex bg-accent-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMobileOpen((m) => !m)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-bg-secondary border-t border-border overflow-hidden"
          >
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="w-full bg-card border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight"
                />
              </div>
            </form>
            <div className="flex flex-col px-4 pb-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="py-3 text-sm font-medium text-text-secondary hover:text-text-primary border-b border-border/50"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="py-3 text-sm font-medium text-text-secondary hover:text-text-primary border-b border-border/50"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/watchlist"
                    className="py-3 text-sm font-medium text-text-secondary hover:text-text-primary border-b border-border/50"
                  >
                    Watchlist
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="py-3 text-sm font-medium text-accent-primary text-left"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="mt-2 bg-accent-primary text-white text-sm font-semibold text-center px-4 py-2.5 rounded-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
