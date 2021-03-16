//import mongoose
const mongoose = require("mongoose")

//create a schema
const ProductSchema = mongoose.Schema({
    productId : {type:Number,required:true},
    pname : {type:String,required:true},
    price :  {type:Number,required:true},
    brand : {type:String,required:true},
    image : {type:String,required:true}
})

//create a model
const Product = mongoose.model("product",ProductSchema)

//export model
module.exports = Product;