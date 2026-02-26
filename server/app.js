import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./src/routes/authRoutes.js";
import routers from "./src/routes/chatRoutes.js";
const app = express();

// app.use(cors())
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://omniagent-ai-front.onrender.com",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello");
// });
app.use("/api/agent", routers);
app.use("/api/auth", router);
app.use("/api/chat", routers);

export default app;
