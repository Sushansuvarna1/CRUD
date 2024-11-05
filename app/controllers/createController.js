const Category = require("../models/Category");

const createController = {};

createController.add = async (req, res) => {
//  console.log("req",req)
    try {
      const body = req.body;
      const category = new Category(body);
      category.userId=req.user.id
      const data = await category.save();
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  createController.list=async(req,res)=>{
    try{
     const list=await Category.find({userId:req.user.id})
    //  console.log("list",list)
     res.json(list)
    }
    catch(error){
     res.status(500).json({ err:error.message})
    }
   }

  createController.destroy=async(req,res)=>{
    try{
      const id=req.params.id
      const destory=await Category.findOneAndDelete({_id:id})
      res.json(destory)
    }
    catch(error){
     res.status(500).json({err:error.message})
    }
  }
  createController.update = async(req, res) =>{
    try{
      const id = req.params.id
      const body = req.body
      const update= await Category.findOneAndUpdate({_id:id}, body, {new: true, runValidators:true})
      res.json(update)
    }
    catch(error){
      res.status(500).json({err:error.message})
     }
   
}

module.exports=createController
