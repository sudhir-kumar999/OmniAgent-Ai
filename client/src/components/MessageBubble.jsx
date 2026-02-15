function MessageBubble({ message }) {

  const isUser = message.role === "user";

  return (
    <div
      style={{
        textAlign: isUser ? "right" : "left",
        marginBottom: "10px"
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "10px",
          borderRadius: "10px",
          background: isUser ? "#4CAF50" : "#eee",
          color: isUser ? "#fff" : "#000"
        }}
      >
        {message.content}
      </span>
    </div>
  );
}

export default MessageBubble;
