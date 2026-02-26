import express from "express";
import {
  chatWithAgent,
  getUserChats,
  getSingleChat,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  deleteTodoController,
  getTodos,
  getTodosController,
} from "../tools/todoTools.js";

const routers = express.Router();

routers.post("/run", protect, chatWithAgent);
routers.get("/user/:userId", protect, getUserChats);
routers.get("/session/:sessionId", protect, getSingleChat);
routers.get("/todo", protect, getTodosController);
routers.get("/todo", protect, getTodos);

routers.delete("/todo/:id", protect, deleteTodoController);

export default routers;
