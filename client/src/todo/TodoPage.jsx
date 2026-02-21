import React, { useRef, useState, useEffect } from "react";
import { api } from "../services/api";

export default function TodoPage() {

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("hi-IN");

  const recognitionRef = useRef(null);

  // 🔥 Load previous session if exists
  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      const res = await api.get(`/chat/${sessionId}`);
      setMessages(res.data.history || []);
    };

    fetchSession();
  }, [sessionId]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setText(voiceText);
    };
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      parts: [{ text }]
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // const res = await api.post("/chat", {
      //   sessionId,
      //   message: text
      // });
      const res = await api.post(
  "/chat",
  {
    sessionId,
    message: text
  },
  {
    withCredentials: true   // ⭐ IMPORTANT
  }
);


      const botMessage = {
        role: "model",
        parts: [{ text: res.data.reply }]
      };

      setSessionId(res.data.sessionId);

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.log(error);
    }

    setText("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 pt-20">

      {/* 🔵 CHAT AREA */}
      <div className="flex-1 overflow-y-auto pt-6 px-4">
        <div className="max-w-3xl mx-auto space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.parts?.[0]?.text}
            </div>
          ))}

        </div>
      </div>

      {/* 🟣 INPUT */}
      <form onSubmit={handleSubmit} className="border-t bg-white p-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 bg-gray-50 border rounded-2xl px-3 py-2">

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or speak..."
              className="flex-1 bg-transparent outline-none"
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="hi-IN">HI</option>
              <option value="en-US">EN</option>
              <option value="en-IN">EN-IN</option>
            </select>

            <button
              type="button"
              onClick={startListening}
              className={`p-2 rounded-full ${
                listening
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              🎤
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
            >
              ➤
            </button>

          </div>
        </div>
      </form>
    </div>
  );
}
