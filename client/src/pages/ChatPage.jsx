import { useState } from "react";
import API from "../services/api";
import ChatBox from "../components/ChatBox";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userId = "sudhir123"; // temp hardcoded

  const sendMessage = async (text) => {
    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);

    const res = await API.post("/", {
      userId,
      sessionId,
      message: text,
    });

    setSessionId(res.data.sessionId);

    const botMessage = { role: "assistant", content: res.data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  const loadUserChats = async () => {
    const res = await API.get(`/user/${userId}`);
    return res.data;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-lg
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        <Sidebar
          loadUserChats={loadUserChats}
          setMessages={setMessages}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar (Mobile Only) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="font-semibold text-lg">AI Chat</h1>
          <div></div>
        </div>

        {/* ChatBox */}
        <div className="flex-1 overflow-hidden">
          <ChatBox messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
