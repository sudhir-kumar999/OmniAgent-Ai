import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // wait until auth check completes
    if (loading) return;

    if (user) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // show temporary UI while deciding redirect
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-gray-600 mt-4 text-lg">
        Page not found 🚫
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Redirecting...
      </p>
    </div>
  );
}