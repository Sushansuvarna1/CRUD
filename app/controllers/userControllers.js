const User=require("../models/users")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userController={}


userController.register=async(req,res)=>{
    try{
        const body=req.body
        const user=  new User(body)
        const data=await user.save()
        res.json(data)

    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}

userController.login=async(req,res)=>{
    try{
        const body=req.body
        const response=await User.findOne({email:body.email})
        if(response){
         const comparision = await bcryptjs.compare(body.password,response.password)
         if(comparision){
            const tokenData={
                id:response._id,
                email:response.email
            }
            const token= jwt.sign(tokenData,process.env["JWT_TOKEN"],{expiresIn:"10d"})
            res.json({
                token:token
            })
         }else{
            res.json({error:"Invalid email and passowrd"})
         }
        }
    }
 catch(err){
    res.status(400).json({ error: err.message });
 }
  
}

userController.account=async(req,res)=>{
res.json(req.user)
}


module.exports=userController