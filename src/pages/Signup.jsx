import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in every field.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const result = signup(form);
      setSubmitting(false);
      if (result.success) {
        showToast("Account created. Welcome to StreamNova!", "success");
        navigate("/", { replace: true });
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
        Create your account
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        Join StreamNova and start watching today.
      </p>

      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-accent-primary/10 border border-accent-primary/30 text-sm text-accent-primary">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-text-secondary mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jane Doe"
              className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
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
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="At least 6 characters"
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm text-text-secondary mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              placeholder="Re-enter your password"
              className="w-full bg-bg-secondary border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-highlight"
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 rounded border-border bg-bg-secondary text-accent-primary focus:ring-accent-highlight"
          />
          I agree to the Terms of Service and Privacy Policy.
        </label>

        <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-accent-highlight hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
