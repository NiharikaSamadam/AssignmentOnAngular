//import mongoose
const mongoose = require("mongoose")

//create a schema
const UserSchema = new mongoose.Schema({
    username : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    gender : {type:String,required:true},
    image : {type:String,required:true}
})


//create a model
const User = mongoose.model("user",UserSchema)

//export schema
module.exports = User;