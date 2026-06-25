import { motion } from "framer-motion";
import { FiCheck, FiStar } from "react-icons/fi";
import Button from "./Button";

export default function PricingCard({ plan, isCurrent, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className={`relative flex flex-col bg-card border rounded-2xl p-7 ${
        plan.popular
          ? "border-accent-secondary shadow-glow-purple"
          : "border-border"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-accent-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
          <FiStar size={11} className="fill-white" /> Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-text-primary mb-1">
        {plan.name}
      </h3>
      <p className="text-sm text-text-secondary mb-5">{plan.tagline}</p>
      <div className="flex items-end gap-1 mb-6">
        <span className="text-4xl font-bold text-text-primary">
          ₹{plan.price}
        </span>
        <span className="text-text-secondary mb-1">/ {plan.cycle}</span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-text-secondary"
          >
            <FiCheck className="text-accent-highlight mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.popular ? "purple" : "secondary"}
        className="w-full"
        onClick={() => onSelect?.(plan)}
      >
        {isCurrent ? "Current Plan" : "Choose Plan"}
      </Button>
    </motion.div>
  );
}
