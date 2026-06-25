import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/streamnova-auth-bg/1920/1080')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="absolute inset-0 bg-glow-radial" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <Link to="/" className="flex items-center gap-1.5 mb-8">
          <span className="font-display text-3xl text-accent-primary">
            Stream
          </span>
          <span className="font-display text-3xl text-text-primary">
            Nova
          </span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
