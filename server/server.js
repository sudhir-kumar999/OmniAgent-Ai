import app from "./app.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv"
dotenv.config()

const PORT=process.env.PORT
connectDB()

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})