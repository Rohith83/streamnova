import { Link } from "react-router-dom";
import Button from "./Button";

export default function EmptyState({ icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center text-text-secondary mb-6 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo}>
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
