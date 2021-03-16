//import express
const exp = require("express")
const app = exp()

//import dotenv
require("dotenv").config()

//import path
const path = require("path")

//merge this server with dist folder
app.use(exp.static(path.join(__dirname,"dist/ecommerceapp")))

//connections to database
const mongoose = require("mongoose")

mongoose.connect(process.env.DBURL,{useNewUrlParser:true,useUnifiedTopology:true})

//get default connection object
const db = mongoose.connection;

db.on('error',() => console.log("error in conneting to db"))

db.once('open',() => console.log("Connected to database"))



//import apis
const userApiObj = require("./APIS/user-api")
const adminApiObj = require("./APIS/admin-api")
const productApiObj = require("./APIS/product-api")
const cartApiObj = require("./APIS/cart-api")

//forward paths to apis
app.use("/user",userApiObj)
app.use("/admin",adminApiObj)
app.use("/product",productApiObj)
app.use("/cart",cartApiObj)

//Invalid path
app.use((req,res,next)=>{
    res.send({message:req.url + " is Invalid"})
})

//middlewares
app.use((err,req,res,next)=>{
    console.log(err)
    res.send({message:"failed",reason:err.message})
})

//listen to port
const port = process.env.PORT
app.listen(port,()=>{console.log(`server started at port ${port}`)})