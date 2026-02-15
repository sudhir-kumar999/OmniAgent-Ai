import { runAgent } from "../agent/runAgent.js";
import Chat from "../models/Chat.js";
import { v4 as uuidv4 } from "uuid";

export const chatWithAgent = async (req, res) => {
  const { userId, sessionId, message } = req.body;
  try {
    let chat = await Chat.findOne({ userId, sessionId });
    if (!chat) {
      chat = new Chat({
        userId,
        sessionId: sessionId || uuidv4(),
        history: [],
      });
    }
    chat.history.push({
      role: "user",
      parts: [{ text: message }],
    });
    const { reply, updatedHistory } = await runAgent(chat.history);

    chat.history = updatedHistory;

    await chat.save();

    res.json({
      sessionId: chat.sessionId,
      reply
    });
  } catch (error) {
     console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch user sessions
export const getUserChats = async (req, res) => {

  const { userId } = req.params;

  const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

  res.json(chats);
};


// Fetch single session history
export const getSingleChat = async (req, res) => {

  const { sessionId } = req.params;

  const chat = await Chat.findOne({ sessionId });

  res.json(chat);
};
