import { motion } from "framer-motion";
import { classNames } from "../utils/helpers";

const variants = {
  primary:
    "bg-accent-primary text-white hover:bg-red-600 shadow-glow",
  secondary:
    "bg-white/10 text-text-primary hover:bg-white/20 border border-border",
  ghost:
    "bg-transparent text-text-primary hover:bg-white/10 border border-border",
  purple:
    "bg-accent-secondary text-white hover:bg-violet-500 shadow-glow-purple",
  outline:
    "bg-transparent text-text-primary border border-white/20 hover:border-white/40",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon = null,
  iconPosition = "left",
  disabled = false,
  type = "button",
  onClick,
  ...rest
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={classNames(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </motion.button>
  );
}
