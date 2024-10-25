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
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


//using api routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/task",taskRoutes);

app.listen(process.env.PORT, () => console.log(`listening on port https://localhost:${process.env.PORT}`))