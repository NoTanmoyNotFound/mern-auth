import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})





const app = express();

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})

//test api to route
// app.get("/", (req, res) => {
//   res.json({ message: "Api is running" });
// })

app.use('/',userRoutes);
app.use('/api/user',userRoutes);