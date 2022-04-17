const Router = require("express").Router();
const {verifyToken,verifytokenandAuth}= require("../middlewares/VerifyToken")
const User=require("../models/User")
CryptoJS=require("crypto-js")

Router.put('/:id',verifytokenandAuth,async(req,res)=>{
        if (req.body.password) {
          req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.ENC_PASS).toString()
        }
        console.log(req.body.password)
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
})



module.exports= Router