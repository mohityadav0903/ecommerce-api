const express = require("express");
const app = express();
const mongoose= require("mongoose");
const dotenv = require("dotenv");
const authRoute=require("./routes/auth")
dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((error)=>{
    console.log(error);
})


app.use('/api',authRoute);





app.listen(process.env.PORT||5000, ()=>{
    console.log("server running");
})