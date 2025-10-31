import express from "express";
import authRoutes from "./routes/authRoutes"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT
const MONGO_URI = process.env.MONGO_URI as string     // converting to the string

const app = express()

app.use(express.json())

app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["POST" , "GET" , "PUT" , "DELETE"] 
}))

app.use("/api/v1/auth" , authRoutes)

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log("Error : " , err)
        process.exit(1)
    })

    app.listen(SERVER_PORT , () =>{
        console.log("Server running on port: 5000")
    })

