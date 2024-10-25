import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated=async(req,res,next)=>{
    const {Token}=req.cookies;
    if(!Token){
      res.status(404).json({
        success:false,
        message:"Please login to perform this actions"
      })
    }else{
    const decode=jwt.verify(Token,process.env.JWT_SECRET)
    req.user=await User.findById(decode._id);
    next()
    }
}
