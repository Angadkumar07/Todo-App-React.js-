import mongoose from "mongoose";

  //database schema
  const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
      type:String,
      required:true,
    },
    isSelected:{
      type:Boolean,
      required:true,
      default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    createdAt:{
      type:Date,
      default:Date.now,
    }
  })

  //user model
  const Task=mongoose.model('task',TaskSchema);
  export default Task;