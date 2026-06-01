import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import { dbconnect } from "./dbconnect.mjs"
import  UserRoutes from "./src/routes/UserRoutes.mjs"
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config()

const app = express()


app.listen(process.env.PORT, () => {
    console.log(`started and listening on ${process.env.PORT}`)
})

dbconnect()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(UserRoutes)
