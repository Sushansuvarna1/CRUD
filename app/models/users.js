const mongoose = require("mongoose");
const { validate } = require("./Category");
const { default: isEmail } = require("validator/lib/isEmail");
const bcryptjs=require("bcryptjs")
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:true,
    validate:{
        validator:function(value){
            return isEmail(value)
        },
        message:function(){
            return "Invalid email format"
        }
    },
    password:{
       type:String,
       required:true,

    }
  },
  password: {},
},{timestamps:true});

userSchema.pre("save", async function (next) {
    const user = this;
    
    try {
      const salt = await bcryptjs.genSalt();  
      const encryptedPassword = await bcryptjs.hash(user.password, salt);  
      user.password = encryptedPassword; 
      next(); 
    } catch (error) {
      next(error);  
    }
  });

const User=mongoose.model("User",userSchema)

module.exports=User
