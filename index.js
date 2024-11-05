require('dotenv').config()
const express=require("express")
const cors=require("cors")
const app=express()
const port=3070

const configureDB=require("./config/database")
const router=require("./config/routes")

app.use(express.json())
app.use(cors())
app.use(router)



configureDB()
app.listen(port,function(){
    console.log("server is connected to port",port)
})