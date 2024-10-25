import mongoose from "mongoose";

  //database schema
  const UserSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    password:{
      type:String,
      required:true,
    },
    createdAt:{
      type:Date,
      default:Date.now,
    }
  })

  //user model
  const User=mongoose.model('user',UserSchema);
  export default User;