const Router= require("express").Router();
const cryptoJs = require("crypto-js");
const User = require("../models/User");
CryptoJS=require("crypto-js")

Router.post('/signup',async(req,res)=>{
 const newUser= new User({
     username:req.body.username,
     email:req.body.email,
     password:CryptoJS.AES.encrypt(req.body.password,process.env.ENC_PASS),
 });
 try{
const savedUser= await newUser.save();
res.status(201).json(savedUser)
 }catch(err){
     res.status(500).json(err);
 }
});
//LOGIN
Router.post('/login',async(req,res)=>{
    try{
    const user= await User.findOne({
        username:req.body.username
    })
    !user && res.status(400).json("no user found")
    const hashedpass= cryptoJs.AES.decrypt(
        user.password,
        process.env.ENC_PASS
   )
   const originalPassword=hashedpass.toString(cryptoJs.enc.Utf8)
   const inputpass= req.body.password
     originalPassword!== inputpass &&
     res.status(401).json("wrong credentials");
       res.status(200).json(user);
    } catch (error) {
        
    }
})








module.exports= Router;