import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js"
import {connectDB} from "./database/database.js"

const app = express();

//dot env config
config({
    path:'./database/config.env'
})

//database connection
connectDB();

//using Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));


//using api routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/task",taskRoutes);

app.listen(process.env.PORT, () => console.log(`listening on port https://localhost:${process.env.PORT}`))