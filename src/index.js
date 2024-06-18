// require('dotenv').config({path: "./env"})
import dotenv from "dotenv"
dotenv.config({path:'./env'})
  
import connectDB from "./db/db.js";
import express from "express"
const app = express();


connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server Started at port ${process.env.PORT  } `  )
  })   
})
.catch((err)=>{
  console.log("MongoDB connection failed", err);
})