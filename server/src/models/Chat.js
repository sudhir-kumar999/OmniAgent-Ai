import mongoose from "mongoose";


const messageSchema=new mongoose.Schema({
    role:String,
    parts:Array
})

const chatSchema=new mongoose.Schema({
    userId:String,
    sessionId:String,
    history:[messageSchema],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("Chat",chatSchema)