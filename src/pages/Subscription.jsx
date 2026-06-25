import { motion } from "framer-motion";
import PricingCard from "../components/PricingCard";
import { plans } from "../data/plans";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    if (!isAuthenticated) {
      showToast("Sign in to choose a plan.", "info");
      navigate("/login");
      return;
    }
    updateProfile({ plan: plan.name });
    showToast(`You're now on the ${plan.name} plan.`, "success");
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-4xl sm:text-5xl text-text-primary mb-3">
          Plans for every screen
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          Pick a plan that fits how you watch. Switch or cancel anytime — no
          contracts, no hassle.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isCurrent={isAuthenticated && user?.plan === plan.name}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="mt-14 max-w-2xl mx-auto text-center">
        <h3 className="text-text-primary font-semibold mb-2">
          All plans include
        </h3>
        <p className="text-sm text-text-secondary">
          Unlimited access to our full catalog, ad-free streaming, new
          releases every week, and the ability to cancel online in two clicks.
          This is a demo — no payment is ever collected.
        </p>
      </div>
    </div>
  );
}
