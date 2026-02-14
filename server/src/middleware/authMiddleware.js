import User from "../models/User.js"
import { verifyToken } from "../utils/token.js"

export const protect=async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken
        // console.log(token)
        if(!token){
            return res.json({
                success:false,
                message:"no token found plz login"
            })
        }
        const secret=process.env.JWT_SECRET
        const decoded=verifyToken(token,secret)
        console.log(decoded)
        const user=await User.findById(decoded._id).select("-password")
        req.user=user
        next()
    } catch (error) {
        console.log("auth middleware error",error)
    }
}