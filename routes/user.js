import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {getAllUsers,getUserById,register,login,getUserProfile,logOut} from "../controllers/user.js"

const router=express.Router();

router.get("/users",getAllUsers);
router.get("/userById/:id",getUserById);
router.post("/newUser",register);
router.post("/login",login);
router.get("/logout",logOut);
router.get("/getUserProfile",isAuthenticated,getUserProfile)

export default router;
