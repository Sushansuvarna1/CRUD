const mongoose =require("mongoose")
const Schema=mongoose.Schema

const CategorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    }
})

const Category=mongoose.model("category",CategorySchema)

module.exports=Category