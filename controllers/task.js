import mongoose from "mongoose";
import Task from "../models/task.js";

export const newTask=async(req,res)=>{
    try {
        const {title,description}=req.body;
        await Task.create({
            title,
            description,
            user:req.user,
        })
        res.status(201).json({
            success:true,
            message:"Task Added successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const getMyTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated. Please log in.",
            });
        }

        const { id } = req.user; 
        const tasks = await Task.find({ user: id }); 
        
        if (!tasks.length) {
            return res.status(404).json({
                success: true,
                message: "No tasks found for the user.",
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: "All tasks fetched successfully.",
            data: tasks,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateMyTask=async(req,res)=>{
    try {
        const task=await Task.findById(req.params.id);
        if(!task){
            res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }else{
            task.isSelected=!task.isSelected;
            await task.save();
            res.status(200).json({
                success:true,
                message:"Task Updated successfully"
        })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteMyTask=async(req,res)=>{
    try {
        const task=await Task.findById(req.params.id);
        if(!task){
            res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }else{
            await task.deleteOne();
            res.status(200).json({
                success:true,
                message:"Task deleted successfully"
        })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}