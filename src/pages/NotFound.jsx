import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilm } from "react-icons/fi";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center text-accent-primary text-3xl mx-auto mb-6">
          <FiFilm />
        </div>
        <h1 className="font-display text-6xl sm:text-8xl text-text-primary mb-3">
          404
        </h1>
        <h2 className="text-xl text-text-primary mb-2">This scene doesn't exist</h2>
        <p className="text-text-secondary max-w-sm mx-auto mb-8">
          The page you're looking for may have been moved, deleted, or never
          existed in our catalog.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
