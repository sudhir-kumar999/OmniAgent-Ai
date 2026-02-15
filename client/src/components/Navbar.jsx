import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-950 text-white shadow-lg fixed w-full z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-blue-500"
          >
            OmniAgent AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            {user && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/assistant">Assistant</Link>
                <Link to="/todo">Todo</Link>
              </>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link
                  to="/register"
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-3xl transition"
            onClick={toggleMenu}
          >
            {isOpen ? "✕" : "☰"}
          </button>

        </div>
      </nav>

      {/* Mobile Overlay + Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer */}
          <div
            className="fixed right-0 top-0 h-full w-72 bg-gray-900 p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex flex-col space-y-6 text-white mt-10">

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/assistant"
                    onClick={() => setIsOpen(false)}
                  >
                    Assistant
                  </Link>

                  <Link
                    to="/todo"
                    onClick={() => setIsOpen(false)}
                  >
                    Todo
                  </Link>
                </>
              )}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-600 px-4 py-2 rounded"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
