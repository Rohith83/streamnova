import { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ToastProvider } from "./context/ToastContext";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader";

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem("streamnovaLoaded") !== "true";
  });

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("streamnovaLoaded", "true");
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WatchlistProvider>
            <ScrollToTopOnNavigate />
            <AppRoutes />
          </WatchlistProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}