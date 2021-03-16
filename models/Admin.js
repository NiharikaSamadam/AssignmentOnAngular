//import mongoose
const mongoose = require("mongoose")

//create a schema
const AdminSchema = mongoose.Schema({
    username : {type:String,required : true},
    email : {type : String, required:true},
    password : {type:String,required : true}
})

//create a model
const Admin = mongoose.model("Admin",AdminSchema);

//export model
module.exports = Admin;