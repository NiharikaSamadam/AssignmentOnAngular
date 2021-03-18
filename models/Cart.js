//import mongoose
const mongoose = require("mongoose")

//create a schema
const CartSchema = mongoose.Schema({
    username : {type : String,required:true},
    productId : {type:Number,required:true},
    pname : {type:String,required:true},
    price :  {type:Number,required:true},
    brand : {type:String,required:true},
    image : {type:String,required:true}
})

//create a model
const Cart = mongoose.model("cart",CartSchema)

//export model
module.exports = Cart;