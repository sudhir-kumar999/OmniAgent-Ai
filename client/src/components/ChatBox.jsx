import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";

function ChatBox({ messages, sendMessage }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const text = input;
    setInput("");
    setLoading(true);

    await sendMessage(text);

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // 🔥 Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full bg-gray-100">

      {/* 🔥 Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {loading && <Loader />}

        <div ref={bottomRef}></div>
      </div>

      {/* 🔥 Input Area Fixed Bottom */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask something..."
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
