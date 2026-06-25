import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBookmark,
  FiPlayCircle,
  FiCreditCard,
  FiSettings,
  FiBell,
  FiShield,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { getInitials } from "../utils/helpers";

const settingsCards = [
  { icon: <FiSettings size={18} />, label: "Account Settings", desc: "Update your personal details" },
  { icon: <FiBell size={18} />, label: "Notifications", desc: "Manage what we send you" },
  { icon: <FiShield size={18} />, label: "Privacy & Security", desc: "Control your data and access" },
  { icon: <FiHelpCircle size={18} />, label: "Help Center", desc: "Get answers to common questions" },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const { watchlist, continueWatching } = useWatchlist();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    setConfirmOpen(false);
    logout();
    showToast("You've been signed out.", "info");
    navigate("/");
  };

  const handleSettingsClick = (label) => {
    showToast(`${label} isn't available in this demo.`, "info");
  };

  const recentActivity = [...continueWatching]
    .sort((a, b) => b.lastWatched - a.lastWatched)
    .slice(0, 5);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-10">
          <div className="w-24 h-24 rounded-2xl bg-accent-secondary flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {getInitials(user?.name || "U")}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-text-primary mb-1">
              {user?.name}
            </h1>
            <p className="text-sm text-text-secondary mb-2">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-accent-secondary/15 text-accent-secondary border border-accent-secondary/30 rounded-full">
              {user?.plan || "Standard"} Plan
            </span>
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            className="sm:ml-auto flex items-center gap-2 text-sm text-accent-primary hover:underline mt-2 sm:mt-0"
          >
            <FiLogOut size={15} /> Sign out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <ProfileCard
            icon={<FiBookmark size={18} />}
            label="Watchlist"
            value={`${watchlist.length} titles`}
            accent="highlight"
          />
          <ProfileCard
            icon={<FiPlayCircle size={18} />}
            label="Continue Watching"
            value={`${continueWatching.length} titles`}
            accent="primary"
          />
          <ProfileCard
            icon={<FiCreditCard size={18} />}
            label="Membership"
            value={user?.plan || "Standard"}
            accent="secondary"
          />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Account Settings
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {settingsCards.map((card) => (
              <button
                key={card.label}
                onClick={() => handleSettingsClick(card.label)}
                className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 text-left hover:border-white/20 transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary flex-shrink-0">
                  {card.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {card.label}
                  </p>
                  <p className="text-xs text-text-secondary">{card.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Recent Activity
          </h2>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-text-secondary">
              Nothing watched yet.{" "}
              <Link to="/browse" className="text-accent-highlight hover:underline">
                Start exploring the catalog.
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <Link
                  to={`/watch/${item.id}`}
                  key={item.id}
                  className="flex items-center gap-4 bg-card border border-border rounded-xl p-3 hover:border-white/20 transition-colors"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                    onError={(e) => (e.target.style.opacity = "0")}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {item.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.progress}% watched
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Sign out of StreamNova?"
      >
        <p className="text-sm text-text-secondary mb-6">
          You'll need to sign back in to watch titles, manage your watchlist,
          or update your profile.
        </p>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </Modal>
    </div>
  );
}
