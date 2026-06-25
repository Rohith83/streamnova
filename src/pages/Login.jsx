import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const result = login({ email, password });
      setSubmitting(false);
      if (result.success) {
        showToast("Welcome back! You're signed in.", "success");
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-card"
    >
      <h1 className="text-2xl font-semibold text-text-primary mb-1">
        Welcome back
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        Sign in to continue watching.
      </p>

      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-accent-primary/10 border border-accent-primary/30 text-sm text-accent-primary">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-text-secondary mb-1.5">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-border bg-bg-secondary text-accent-primary focus:ring-accent-highlight"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => showToast("Password reset isn't available in this demo.", "info")}
            className="text-accent-highlight hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-text-secondary">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => showToast("Social login isn't available in this demo.", "info")}
          className="flex items-center justify-center gap-2 bg-bg-secondary border border-border rounded-lg py-2.5 text-sm text-text-primary hover:bg-white/5 transition-colors"
        >
          <FaGoogle size={15} /> Google
        </button>
        <button
          type="button"
          onClick={() => showToast("Social login isn't available in this demo.", "info")}
          className="flex items-center justify-center gap-2 bg-bg-secondary border border-border rounded-lg py-2.5 text-sm text-text-primary hover:bg-white/5 transition-colors"
        >
          <FaApple size={15} /> Apple
        </button>
      </div>

      <p className="text-center text-sm text-text-secondary mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-accent-highlight hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
