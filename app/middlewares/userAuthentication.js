const User=require("../models/users")
const jwt=require("jsonwebtoken")

const userAuthentication=async(req,res,next)=>{

    const token=req.headers["authentication"]
    let tokenData
    try{
     tokenData=jwt.verify(token,process.env["JWT_TOKEN"])
    //  console.log("token",tokenData)
     User.findById(tokenData._id)
          req.user={
            id:tokenData.id,
            email:tokenData.email
          }    
          next()
    }

    catch(err){
     res.json(err.message)
    }
}

module.exports=userAuthentication