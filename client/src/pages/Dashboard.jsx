import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* Top Navbar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide">
          OmniAgent AI
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 px-5 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Autonomous AI Productivity Platform
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Intelligent multi-tool AI agent combined with voice-powered autonomous task automation.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 pb-20">

        {/* AI Agent Card */}
        <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300 border border-gray-800">

          <h3 className="text-2xl font-semibold mb-4">
            🤖 AI Autonomous Agent
          </h3>

          <ul className="text-gray-400 space-y-3 mb-6">
            <li>• Multi-tool orchestration (Weather, Crypto, PDF, YouTube, etc.)</li>
            <li>• Gemini 2.5 Flash tool-calling architecture</li>
            <li>• Autonomous decision-making logic</li>
            <li>• Dynamic tool registry execution</li>
            <li>• Expandable to 10+ AI tools</li>
            <li>• Future-ready for RAG & memory integration</li>
          </ul>

          <button
            onClick={() => navigate("/dashboard/chat")}
            className="w-full bg-blue-600 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Launch AI Agent
          </button>
        </div>

        {/* Autonomous Todo Card */}
        <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300 border border-gray-800">

          <h3 className="text-2xl font-semibold mb-4">
            🧠 Autonomous Todo System
          </h3>

          <ul className="text-gray-400 space-y-3 mb-6">
            <li>• Command-based task management</li>
            <li>• Voice-enabled task creation</li>
            <li>• AI-driven task parsing</li>
            <li>• Add / Delete / Update using natural language</li>
            <li>• Real-time task rendering</li>
            <li>• Future backend persistence ready</li>
          </ul>

          <button
            onClick={() => navigate("/dashboard/todo")}
            className="w-full bg-green-600 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Open Todo Manager
          </button>
        </div>

      </div>

    </div>
  );
}
