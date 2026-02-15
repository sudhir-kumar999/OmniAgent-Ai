function Sidebar({ loadUserChats, setMessages }) {

  const handleLoadChats = async () => {
    const chats = await loadUserChats();

    if (chats.length > 0) {
      const latestChat = chats[0];

      const formatted = latestChat.history
        .filter(msg => msg.parts[0].text)
        .map(msg => ({
          role: msg.role === "model" ? "assistant" : msg.role,
          content: msg.parts[0].text
        }));

      setMessages(formatted);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">

      {/* Header */}
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-xl font-semibold">AI Utility Hub</h2>
        <p className="text-sm text-gray-400 mt-1">
          Your personal AI assistant
        </p>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        <button
          onClick={handleLoadChats}
          className="w-full bg-gray-800 hover:bg-gray-700 transition 
                     px-4 py-3 rounded-lg text-left"
        >
          📂 Load Last Chat
        </button>

        {/* Future Features Placeholder */}
        <button
          className="w-full bg-gray-800 hover:bg-gray-700 transition 
                     px-4 py-3 rounded-lg text-left"
        >
          🆕 New Chat
        </button>

      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        © 2026 Sudhir AI
      </div>

    </div>
  );
}

export default Sidebar;
