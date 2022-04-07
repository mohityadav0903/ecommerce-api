const express = require("express");
const app = express();
const mongoose= require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.get('/',(req,res)=>{
    res.send("hello");
})
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((error)=>{
    console.log(error);
})








app.listen(process.env.PORT||5000, ()=>{
    console.log("server running");
})