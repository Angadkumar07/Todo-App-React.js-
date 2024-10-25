import jwt from "jsonwebtoken";

export const setCookie=(User,res,message,statusCode=200)=>{

    const token=jwt.sign({_id:User._id},process.env.JWT_SECRET)
    res.status(statusCode).cookie('Token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='Development'? false : true,
        sameSite:process.env.NODE_ENV==='Development'? "lax":"none",
      }).json({
        sucsess:true,
        message
      })
}
