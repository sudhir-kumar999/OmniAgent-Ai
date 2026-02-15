import express from "express";
import {
  chatWithAgent,
  getUserChats,
  getSingleChat
} from "../controllers/chatController.js";

const routers = express.Router();

routers.post("/", chatWithAgent);
routers.get("/user/:userId", getUserChats);
routers.get("/session/:sessionId", getSingleChat);

export default routers;
