import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

const columns = [
  {
    title: "Browse",
    links: [
      { label: "Home", to: "/" },
      { label: "Movies", to: "/browse" },
      { label: "TV Shows", to: "/tv-shows" },
      { label: "New & Popular", to: "/new-popular" },
      { label: "Categories", to: "/categories" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Sign In", to: "/login" },
      { label: "Create Account", to: "/signup" },
      { label: "My Watchlist", to: "/watchlist" },
      { label: "Profile", to: "/profile" },
      { label: "Subscription Plans", to: "/subscription" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faq" },
      { label: "Supported Devices", to: "/devices" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 mb-4">
              <span className="font-display text-2xl text-accent-primary">
                Stream
              </span>
              <span className="font-display text-2xl text-text-primary">
                Nova
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-4 max-w-xs">
              Stream thousands of blockbuster movies, binge-worthy TV shows, and
              exclusive originals in stunning HD and 4K. Watch anytime, anywhere.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-highlight/50 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                )
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

     <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
  <p className="text-xs text-text-secondary">
    © {new Date().getFullYear()} StreamNova. All rights reserved.
  </p>

  <div className="flex gap-5 text-xs text-text-secondary">
    <Link
      to="/privacy"
      className="hover:text-text-primary transition-colors"
    >
      Privacy Policy
    </Link>

    <Link
      to="/terms"
      className="hover:text-text-primary transition-colors"
    >
      Terms of Service
    </Link>

    <Link
      to="/cookies"
      className="hover:text-text-primary transition-colors"
    >
      Cookie Preferences
    </Link>
  </div>
</div>
      </div>
    </footer>
  );
}
