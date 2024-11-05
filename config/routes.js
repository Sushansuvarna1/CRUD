const express=require("express")
const router=express.Router()
const createController=require("../app/controllers/createController")
const userController = require("../app/controllers/userControllers")
const userAuthentication=require("../app/middlewares/userAuthentication")

//UserController
router.post("/user/register",userController.register)
router.post("/user/login",userController.login)
router.get("/user/account",userAuthentication,userController.account)


//Category
router.post("/api/category",userAuthentication,createController.add)
router.get("/api/get",userAuthentication,createController.list)
router.delete("/api/delete/:id",userAuthentication,createController.destroy)
router.put("/api/update/:id",userAuthentication,createController.update)




module.exports=router
