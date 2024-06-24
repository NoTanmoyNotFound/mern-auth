import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})





const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})

//test api to route
// app.get("/", (req, res) => {
//   res.json({ message: "Api is running" });
// })

app.use('/',userRoutes);
app.use('/api/user',userRoutes);
app.use("/api/auth",authRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})