import { useState, useRef, useEffect } from "react";
import api from "../services/api";

export default function AgentChat() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const userId = "sudhir123";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    setChat(prev => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/agent/run", {
        userId,
        message: userMsg
      });

      setChat(prev => [
        ...prev,
        { role: "agent", text: res.data.reply }
      ]);

    } catch (error) {
      console.error(error);
      setChat(prev => [
        ...prev,
        { role: "agent", text: "⚠️ Error communicating with agent." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-black text-white">

      {/* Header */}
      <div className="p-4 border-b border-gray-800 text-center text-xl font-semibold">
        Omni Agent 🤖
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md text-sm sm:text-base whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 rounded-br-none"
                  : "bg-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-none animate-pulse text-gray-400">
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-black">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">

          <input
            type="text"
            className="flex-1 p-3 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full transition-all duration-200 shadow-lg"
          >
            Send
          </button>

        </div>
      </div>

    </div>
  );
}