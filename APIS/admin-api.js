//mini express
const exp = require("express")
const adminApiObj = exp.Router()

//import express-async-handler
const errorHandler = require("express-async-handler")

//import bcryptjs
const bcryptjs = require("bcryptjs")

adminApiObj.use(exp.json())

//import model
const Admin = require("../models/Admin")

//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import dotenv
require("dotenv").config()

//create admin
//http://localhost:3000/admin/createadmin
adminApiObj.post("/createadmin",errorHandler(async(req,res)=>{

    //search for user in db with username
    let adminObjFromDb = await Admin.findOne({username:req.body.username})

    if(adminObjFromDb == null){

        //hashPw 
        const hashedPw = await bcryptjs.hash(req.body.password,7)

        //create new object
         let newAdminObj = new Admin({
             username:req.body.username,
             email:req.body.email,
             password:hashedPw
         })

         //save it
         newAdminObj.save()
         res.send({message:"Admin created"})
    }
    else{
        res.send({message:"amdin already exists in db"})
    }
}))


//Admin login
//http://localhost:3000/admin/adminlogin
adminApiObj.post("/adminlogin",errorHandler(async(req,res)=>{

    //search from admin in db with username
    let adminObjFromDb = await Admin.findOne({username:req.body.username})

    //if admin doesn't exists
    if(adminObjFromDb == null){
        res.send({message:"Invalid Username"})
    }

    //if admin exists in db
    else{
        //compare passwords
        let result = await bcryptjs.compare(req.body.password,adminObjFromDb.password)

        //if passwords are matched
        if(result == false){
            res.send({message:"Invalid password"})
        }
        else{

            //create token and sign it
            let signedToken = await jwt.sign({username:req.body.username},process.env.SECRET,{expiresIn:500})

            //send response along with token
            res.send({message:"Login Success",token:signedToken,username:req.body.username})
        }
    }

}))


//export
module.exports = adminApiObj