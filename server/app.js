import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import router from "./src/routes/authRoutes.js";
const app=express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api/auth", router);



export default app;