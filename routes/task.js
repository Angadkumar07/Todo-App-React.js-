import express from "express";
import { newTask ,getMyTask,deleteMyTask,updateMyTask} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/getMyTask",isAuthenticated,getMyTask);
router.put("/updateMyTask/:id",isAuthenticated,updateMyTask);
router.delete("/deleteMyTask/:id",isAuthenticated,deleteMyTask);
export default router;