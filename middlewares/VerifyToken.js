const jwt = require("jsonwebtoken");

const verifyToken= (req,res,next)=>{
    const authToken=req.headers.token;
    if(authToken){
        jwt.verify(authToken,process.env.jwt_sec,(err,user)=>{
            if(err) res.status(403).json("token is not valid");
            req.user=user;
            next();
        })

    }
    else{
        res.status(401).json("you are not authenticated");
    }
}
const verifytokenandAuth=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("you are not allowed");
        }
    })
}

module.exports={verifyToken,verifytokenandAuth}