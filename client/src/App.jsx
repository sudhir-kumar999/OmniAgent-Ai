import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import TodoPage from "./todo/TodoPage";
import TodoItem from "./todo/TodoItem";

// Future pages (abhi bana sakte ho blank)
// import ChatPage from "./pages/ChatPage";
// import TodoPage from "./pages/TodoPage";

function App() {
  return (
    
      <div>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/dashboard/chat"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/todo"
  element={
    <ProtectedRoute>
      <TodoPage />
    </ProtectedRoute>
  }
/>

          <Route
            path="/assistant"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo/items"
            element={
              <ProtectedRoute>
                <TodoItem />
              </ProtectedRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* 404 Route */}
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
  );
}

export default App;
