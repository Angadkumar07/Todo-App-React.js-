import User from "../models/user.js";
import bycypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({});
        res.status(200).json({
        succses:true,
        users,
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error fetching users"
        })
    }
}
export const getUserById=async(req,res)=>{
    try {
      const {id}=req.params;
      const user=await User.findById(id);
      res.status(200).json({
        success:true,
        user
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error fetching user",
      })
    }
  }
export const register=async(req,res)=>{
    try {
      const {name,email,password}=req.body;
      let user=await User.findOne({email})
      if(user){
        return res.status(400).json({
          success:false,
          message:"Use already exist"
        })
      }
      const hashedpassword=await bycypt.hash(password,10);
      await User.create({
      name,
      email,
      password:hashedpassword
    })
    setCookie(User,res,"User Created Succesdsfully",201)
    } catch (error) {
      console.log(error)
        res.status(500).json({
            success:false,
            message:"Error creating user",
        })
    }
  }
  export const login=async(req,res)=>{
    try {
      const {email,password}=req.body;
      const user=await User.findOne({email})
      if(!user){
        return res.status(400).json({
          success:false,
          message:"User not found"
        })
      }
      const isMatch=await bycypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({
          success:false,
          message:"Invailid Email or Password"
        })
      }
      setCookie(user,res,`Welcome back ${user.name}`,200)

    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Error logging in user",
      })
    }
  }

export const logOut=(req,res)=>{
  try {
    res.status(200).cookie('Token',"",{
      expires:new Date(Date.now()),
    }).json({
      success:true,
      user:req.user,
      message:"User logged out successfully"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error logging out user",
    })
  }
}

export const getUserProfile=async(req,res)=>{
  try {
    res.status(200).json({
      success:true,
      user:req.user
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success:false,
      message:"Error getting user profile"
    })
  }
}
