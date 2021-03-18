//mini express
const exp = require("express")
const userApiObj = exp.Router()

//import express-async-handler
const errorHandler = require("express-async-handler")

userApiObj.use(exp.json())
//import bcryptjs
const bcryptjs = require("bcryptjs")

//import User Model
const User = require("../models/User")

//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import middlewares
const validateToken = require("./middlewares/verifyToken")

//import dotenv
require("dotenv").config()

//imports
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name:'drudeeylj',
    api_key:'381539586774675',
    api_secret: 'loiOEfGtH_edKpA1WU3LOoo7u6E' 
 });

//cofigure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'ecommerce', 
    public_id: file.fieldname + '-' + Date.now()
    }},
   });

//configure multer
var upload = multer({ storage: storage })

//create user
//http://localhost:3000/user/createuser
userApiObj.post("/createuser",upload.single('image'),errorHandler(async(req,res)=>{

 //the req.body.userObj is in JSON,so convert to object
   req.body=JSON.parse(req.body.userObj)
   req.body.image=req.file.path;
   

    //search for user in db with username
    let userObjFromDb = await User.findOne({username:req.body.username})
    
    if(userObjFromDb == null){

        //hash pw
        let hashedPw = await bcryptjs.hash(req.body.password,7)

       let userObj = new User({
           username : req.body.username,
           email : req.body.email,
           password : hashedPw,
           gender : req.body.gender,
           image : req.body.image
        })
        
        //save it in db
        await userObj.save()
        res.send({message:"User created"})
    }
    else{
        res.send({message:"user already exists in db"})
    }

}))

//Login User
//http://localhost:3000/user/loginuser
userApiObj.post("/loginuser",errorHandler(async(req,res)=>{

    //search for user in db with username
    let userObjFromDb = await User.findOne({username:req.body.username})

    //if user doesn't exists in db
    if(userObjFromDb == null){
        res.send({message:"failed",reason:"Invalid Username"})
    }

    //if user exists in db
    else{
        let result = await bcryptjs.compare(req.body.password,userObjFromDb.password)

        //if passwords are not matched
        if(result == false){
            res.send({message:"failed",reason:"Invalid Password"})
        }

        //if passwords are matched
        else{
            //create token and sign it
          let signedToken = await jwt.sign({username:req.body.username},process.env.SECRET,{expiresIn : 100})

          //send token with response
          res.send({message:"Login Success",token:signedToken,username:req.body.username})
        }
    }

}))

//get user by username
//http://localhost:3000/user/getuser/<username>
userApiObj.get("/getuser/:username",validateToken,errorHandler(async(req,res)=>{

    //search for use in db with username
    let userObj = await User.findOne({username:req.params.username})
    
    res.send({message:userObj})

}))


//export userapiobj
module.exports = userApiObj