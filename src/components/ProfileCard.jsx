export default function ProfileCard({ icon, label, value, accent = "highlight" }) {
  const accentColors = {
    highlight: "text-accent-highlight bg-accent-highlight/10",
    primary: "text-accent-primary bg-accent-primary/10",
    secondary: "text-accent-secondary bg-accent-secondary/10",
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${accentColors[accent]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-0.5">{label}</p>
        <p className="text-lg font-semibold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
